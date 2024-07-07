/* eslint-disable @typescript-eslint/promise-function-async */
import { importProvidersFrom, inject } from '@angular/core';
import { CanMatchFn, Route, Router, Routes, UrlSegment } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { map, of, switchMap, take } from 'rxjs';
import { LoginResponseDto as UserData } from './api/models/login-response-dto';
import { FeatureKeys } from './constants/feature-keys';
import { AuthEffects } from './store/auth/effects/auth.effects';
import { AuthenticationFacadeService } from './store/auth/facades/auth-facade.service';
import * as AuthReducers from './store/auth/reducers/auth.reducers';
import * as CarDetailsEffects from './store/car-details/effects/car-details.effects';
import * as CarDetailsReducers from './store/car-details/reducers/car-details.reducers';
import * as CarFiltersEffects from './store/car-filters/effects/car-filters.effects';
import * as CarFiltersReducers from './store/car-filters/reducers/car-filters.reducers';
import { FavouritesEffects } from './store/favourites/effects/favourites.effects';
import * as FavouritesReducers from './store/favourites/reducers/favourites.reducers';
import * as PreferencesEffects from './store/preferences/effects/preferences.effects';
import * as PreferencesReducers from './store/preferences/reducers/preferences.reducers';
import * as RecommendedCarsEffects from './store/recommended-cars/effects/recommended-cars.effects';
import * as CarsReducers from './store/recommended-cars/reducers/recommended-cars.reducers';
import * as SettingsEffects from './store/settings/effects/settings.effects';
import * as SettingsReducers from './store/settings/reducers/settings.reducer';
import { AuthenticationHelperService } from './tabs/auth/helpers/auth-helper.service';
import { TabsComponent } from './tabs/tabs.component';

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

const RECOMMENDED_CARS_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.RECOMMENDED_CARS, CarsReducers.reducers),
    EffectsModule.forFeature(RecommendedCarsEffects),
]);

const CAR_FILTERS_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.CAR_FILTERS, CarFiltersReducers.reducers),
    EffectsModule.forFeature(CarFiltersEffects),
]);

const FAVOURITES_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.FAVOURITES, FavouritesReducers.reducers),
    EffectsModule.forFeature(FavouritesEffects),
]);

const CAR_DETAILS_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.CAR_DETAILS, CarDetailsReducers.reducers),
    EffectsModule.forFeature(CarDetailsEffects),
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
                providers: [RECOMMENDED_CARS_PROVIDERS, FAVOURITES_PROVIDERS],
                canMatch: [canMatchAuth],
            },
            {
                path: 'car-filters',
                loadComponent: () =>
                    import('./tabs/car-filters/car-filters.component').then(
                        (component) => component.CarFiltersComponent,
                    ),
                providers: [CAR_FILTERS_PROVIDERS],
                canMatch: [canMatchAuth],
            },
            {
                path: 'car/:id',
                loadComponent: () =>
                    import('./components/car-details/car-details.component').then(
                        (component) => component.CarDetailsComponent,
                    ),
                providers: [CAR_DETAILS_PROVIDERS],
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
