import { combineReducers } from '@ngrx/store';
import { FeatureKeys } from './constants/feature-keys';
import * as AuthReducers from './store/auth/reducers/auth.reducers';
import { AuthState } from './store/auth/reducers/auth.reducers';
import * as CarDetailsReducers from './store/car-details/reducers/car-details.reducers';
import { CarDetailsState } from './store/car-details/reducers/car-details.reducers';
import * as CarFiltersReducers from './store/car-filters/reducers/car-filters.reducers';
import { CarFiltersState } from './store/car-filters/reducers/car-filters.reducers';
import * as FavouritesReducers from './store/favourites/reducers/favourites.reducers';
import { FavouritesState } from './store/favourites/reducers/favourites.reducers';
import * as PlatformReducers from './store/platform/reducers/platform.reducers';
import { PlatformState } from './store/platform/reducers/platform.reducers';
import * as PreferencesReducers from './store/preferences/reducers/preferences.reducers';
import { PreferencesState } from './store/preferences/reducers/preferences.reducers';
import * as CarsReducers from './store/recommended-cars/reducers/recommended-cars.reducers';
import { RecommendedCarsState } from './store/recommended-cars/reducers/recommended-cars.reducers';
import * as SettingsReducers from './store/settings/reducers/settings.reducer';
import { SettingsState } from './store/settings/reducers/settings.reducer';

export interface AppState {
    [FeatureKeys.PLATFORM]: PlatformState;
    [FeatureKeys.AUTH]: AuthState;
    [FeatureKeys.PREFERENCES]: PreferencesState;
    [FeatureKeys.SETTINGS]: SettingsState;
    [FeatureKeys.RECOMMENDED_CARS]: RecommendedCarsState;
    [FeatureKeys.FAVOURITES]: FavouritesState;
    [FeatureKeys.CAR_DETAILS]: CarDetailsState;
    [FeatureKeys.CAR_FILTERS]: CarFiltersState;
}

export const appReducers = combineReducers({
    ...PlatformReducers.platformReducers,
    ...AuthReducers.authReducers,
    ...PreferencesReducers.preferencesReducers,
    ...SettingsReducers.settingsReducer,
    ...CarsReducers.reducers,
    ...FavouritesReducers.reducers,
    ...CarDetailsReducers.reducers,
    ...CarFiltersReducers.reducers,
});
