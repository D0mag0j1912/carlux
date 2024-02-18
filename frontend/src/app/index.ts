import { combineReducers } from '@ngrx/store';
import { FeatureKeys } from './constants/feature-keys';
import { AuthState } from './store/auth/reducers/auth.reducers';
import * as AuthReducers from './store/auth/reducers/auth.reducers';
import * as PlatformReducers from './store/platform/reducers/platform.reducers';
import * as PreferencesReducers from './store/preferences/reducers/preferences.reducers';
import { PreferencesState } from './store/preferences/reducers/preferences.reducers';
import { PlatformState } from './store/platform/reducers/platform.reducers';
import { SettingsState } from './store/settings/reducers/settings.reducer';
import * as SettingsReducers from './store/settings/reducers/settings.reducer';
import { CarsState } from './store/cars/reducers/cars.reducers';
import * as CarsReducers from './store/cars/reducers/cars.reducers';

export interface AppState {
    [FeatureKeys.PLATFORM]: PlatformState;
    [FeatureKeys.AUTH]: AuthState;
    [FeatureKeys.PREFERENCES]: PreferencesState;
    [FeatureKeys.SETTINGS]: SettingsState;
    [FeatureKeys.CARS]: CarsState;
}

export const appReducers = combineReducers({
    ...PlatformReducers.platformReducers,
    ...AuthReducers.authReducers,
    ...PreferencesReducers.preferencesReducers,
    ...SettingsReducers.settingsReducer,
    ...CarsReducers.carsReducers,
});
