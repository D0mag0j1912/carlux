import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { StoreModule } from '@ngrx/store';
import { FeatureKeys } from '../constants/feature-keys';
import * as AuthReducers from './auth/auth-reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth-effects/auth.effects';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsComponent,
        children: [
            {
                path: 'auth',
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
