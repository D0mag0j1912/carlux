import { combineReducers } from '@ngrx/store';
import { FeatureKeys } from './constants/feature-keys';
import { AuthState } from './tabs/auth/auth-reducers/auth.reducers';
import * as AuthReducers from './tabs/auth/auth-reducers/auth.reducers';
import * as PlatformReducers from './tabs/platform/reducers/platform-reducers';
import * as PreferencesReducers from './tabs/preferences/reducers/preferences.reducers';
import { PreferencesState } from './tabs/preferences/reducers/preferences.reducers';
import { PlatformState } from './tabs/platform/reducers/platform-reducers';

export interface AppState {
    [FeatureKeys.PLATFORM]: PlatformState;
    [FeatureKeys.AUTH]: AuthState;
    [FeatureKeys.PREFERENCES]: PreferencesState;
}

export const appReducers = combineReducers({
    ...PlatformReducers.platformReducers,
    ...AuthReducers.authReducers,
    ...PreferencesReducers.preferencesReducers,
});
