import { NgModule, importProvidersFrom, inject } from '@angular/core';
import { CanMatchFn, Route, Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { take, switchMap, of, map } from 'rxjs';
import { FeatureKeys } from '../constants/feature-keys';
import { LoginResponseDto as UserData } from '../api/models/login-response-dto';
import { TabsComponent } from './tabs.component';
import * as AuthReducers from './auth/auth-reducers/auth.reducers';
import { AuthEffects } from './auth/auth-effects/auth.effects';
import { AuthenticationFacadeService } from './auth/auth-facade.service';
import { AuthenticationHelperService } from './auth/helpers/auth-helper.service';

export const canMatchAuth: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const authenticationFacadeService = inject(AuthenticationFacadeService);
    const authenticationHelperService = inject(AuthenticationHelperService);
    const router = inject(Router);
    return authenticationFacadeService.selectUserData().pipe(
        take(1),
        switchMap((userData: UserData | undefined) => {
            if (!userData) {
                return authenticationHelperService.autoLogin();
            } else {
                return of(true);
            }
        }),
        map((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                return router.createUrlTree(['/tabs/auth']);
            }
            return true;
        }),
    );
};

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsComponent,
        children: [
            {
                path: 'auth',
                // eslint-disable-next-line @typescript-eslint/promise-function-async
                loadComponent: () =>
                    import('./auth/auth.component').then((component) => component.AuthComponent),
                providers: [
                    importProvidersFrom([
                        StoreModule.forFeature(FeatureKeys.AUTH, AuthReducers.authReducers),
                        EffectsModule.forFeature(AuthEffects),
                    ]),
                ],
            },
            {
                path: 'marina-list',
                // eslint-disable-next-line @typescript-eslint/promise-function-async
                loadComponent: () =>
                    import('./marina-list/marina-list.component').then(
                        (component) => component.MarinaListComponent,
                    ),
                canMatch: [canMatchAuth],
            },
            {
                path: '',
                redirectTo: '/tabs/auth',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/auth',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TabsRoutingModule {}
