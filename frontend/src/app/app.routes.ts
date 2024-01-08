/* eslint-disable @typescript-eslint/promise-function-async */
import { importProvidersFrom, inject } from '@angular/core';
import { CanMatchFn, Route, Router, Routes, UrlSegment } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { take, switchMap, of, map } from 'rxjs';
import { FeatureKeys } from './constants/feature-keys';
import { LoginResponseDto as UserData } from './api/models/login-response-dto';
import { TabsComponent } from './tabs/tabs.component';
import * as AuthReducers from './tabs/auth/auth-reducers/auth.reducers';
import { AuthEffects } from './tabs/auth/auth-effects/auth.effects';
import { AuthenticationFacadeService } from './tabs/auth/auth-facade.service';
import { AuthenticationHelperService } from './tabs/auth/helpers/auth-helper.service';

const canMatchAuth: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
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

const AUTH_ENVIRONMENT_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.AUTH, AuthReducers.authReducers),
    EffectsModule.forFeature(AuthEffects),
]);

export const routes: Routes = [
    {
        path: 'tabs',
        component: TabsComponent,
        children: [
            {
                path: 'auth',
                loadComponent: () =>
                    import('./tabs/auth/auth.component').then(
                        (component) => component.AuthComponent,
                    ),
                providers: [AUTH_ENVIRONMENT_PROVIDERS],
            },
            {
                path: 'marina-list',
                loadComponent: () =>
                    import('./tabs/marina-list/marina-list.component').then(
                        (component) => component.MarinaListComponent,
                    ),
                providers: [AUTH_ENVIRONMENT_PROVIDERS],
                canMatch: [canMatchAuth],
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./tabs/settings/settings.component').then(
                        (component) => component.SettingsComponent,
                    ),
                providers: [AUTH_ENVIRONMENT_PROVIDERS],
                canMatch: [canMatchAuth],
            },
            {
                path: 'languages',
                loadComponent: () =>
                    import('./tabs/settings/components/languages/languages.component').then(
                        (component) => component.LanguagesComponent,
                    ),
                providers: [AUTH_ENVIRONMENT_PROVIDERS],
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
