import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureKeys } from '../constants/feature-keys';
import { TabsComponent } from './tabs.component';
import * as AuthReducers from './auth/auth-reducers/auth.reducers';
import { AuthEffects } from './auth/auth-effects/auth.effects';

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
