/* eslint-disable @typescript-eslint/promise-function-async */
import { importProvidersFrom, inject } from '@angular/core';
import { CanMatchFn, Route, Router, Routes, UrlSegment } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { take, switchMap, of, map } from 'rxjs';
import { FeatureKeys } from './constants/feature-keys';
import { LoginResponseDto as UserData } from './api/models/login-response-dto';
import { TabsComponent } from './tabs/tabs.component';
import * as AuthReducers from './store/auth/reducers/auth.reducers';
import { AuthEffects } from './store/auth/effects/auth.effects';
import { AuthenticationFacadeService } from './store/auth/facades/auth-facade.service';
import { AuthenticationHelperService } from './tabs/auth/helpers/auth-helper.service';
import * as PreferencesReducers from './store/preferences/reducers/preferences.reducers';
import * as SettingsReducers from './store/settings/reducers/settings.reducer';
import * as SettingsEffects from './store/settings/effects/settings.effects';
import * as PreferencesEffects from './store/preferences/effects/preferences.effects';
import * as CarsReducers from './store/cars/reducers/cars.reducers';
import * as CarsEffects from './store/cars/effects/cars.effects';
import * as FavouritesReducers from './store/favourites/reducers/favourites.reducers';
import * as FavouritesEffects from './store/favourites/effects/favourites.effects';

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

const PREFERENCES_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.PREFERENCES, PreferencesReducers.preferencesReducers),
    EffectsModule.forFeature(PreferencesEffects),
]);

const SETTINGS_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.SETTINGS, SettingsReducers.settingsReducer),
    EffectsModule.forFeature(SettingsEffects),
]);

const CARS_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.CARS, CarsReducers.carsReducers),
    EffectsModule.forFeature(CarsEffects),
]);

const FAVOURITES_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.FAVOURITES, FavouritesReducers.reducers),
    EffectsModule.forFeature(FavouritesEffects),
]);

export const routes: Routes = [
    {
        path: 'tabs',
        component: TabsComponent,
        providers: [SETTINGS_PROVIDERS, PREFERENCES_PROVIDERS, AUTH_ENVIRONMENT_PROVIDERS],
        children: [
            {
                path: 'auth',
                loadComponent: () =>
                    import('./tabs/auth/auth.component').then(
                        (component) => component.AuthComponent,
                    ),
            },
            {
                path: 'recommended-cars',
                loadComponent: () =>
                    import('./tabs/recommended-cars/recommended-cars.component').then(
                        (component) => component.RecommendedCarsComponent,
                    ),
                providers: [CARS_PROVIDERS],
                canMatch: [canMatchAuth],
            },
            {
                path: 'car/:id',
                loadComponent: () =>
                    import('./components/car-details/car-details.component').then(
                        (component) => component.CarDetailsComponent,
                    ),
                providers: [CARS_PROVIDERS],
                canMatch: [canMatchAuth],
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./tabs/settings/settings.component').then(
                        (component) => component.SettingsComponent,
                    ),
                canMatch: [canMatchAuth],
            },
            {
                path: 'languages',
                loadComponent: () =>
                    import('./tabs/settings/components/languages/languages.component').then(
                        (component) => component.LanguagesComponent,
                    ),
                canMatch: [canMatchAuth],
            },
            {
                path: 'profile-details',
                loadComponent: () =>
                    import(
                        './tabs/settings/components/profile-details/profile-details.component'
                    ).then((component) => component.ProfileDetailsComponent),
                canMatch: [canMatchAuth],
            },
            {
                path: 'favourites',
                loadComponent: () =>
                    import('./tabs/favourites/favourites.component').then(
                        (component) => component.FavouritesComponent,
                    ),
                providers: [FAVOURITES_PROVIDERS],
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
