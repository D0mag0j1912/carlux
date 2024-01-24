import { combineReducers } from '@ngrx/store';
import { FeatureKeys } from './constants/feature-keys';
import { AuthState } from './tabs/auth/auth-reducers/auth.reducers';
import * as AuthReducers from './tabs/auth/auth-reducers/auth.reducers';
import * as PlatformReducers from './tabs/platform/reducers/platform-reducers';
import * as PreferencesReducers from './tabs/preferences/reducers/preferences.reducers';
import { PreferencesState } from './tabs/preferences/reducers/preferences.reducers';
import { PlatformState } from './tabs/platform/reducers/platform-reducers';
import { SettingsState } from './store/settings/reducers/settings.reducer';
import * as SettingsReducers from './store/settings/reducers/settings.reducer';

export interface AppState {
    [FeatureKeys.PLATFORM]: PlatformState;
    [FeatureKeys.AUTH]: AuthState;
    [FeatureKeys.PREFERENCES]: PreferencesState;
    [FeatureKeys.SETTINGS]: SettingsState;
}

export const appReducers = combineReducers({
    ...PlatformReducers.platformReducers,
    ...AuthReducers.authReducers,
    ...PreferencesReducers.preferencesReducers,
    ...SettingsReducers.settingsReducer,
});
