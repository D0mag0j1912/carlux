import { Platforms } from '@ionic/core';
import { combineReducers } from '@ngrx/store';
import { FeatureKeys } from './constants/feature-keys';
import { AuthState } from './tabs/auth/auth-reducers/auth.reducers';
import * as fromAuth from './tabs/auth/auth-reducers/auth.reducers';

export interface AppState {
    [FeatureKeys.PLATFORM]: Platforms[];
    [FeatureKeys.AUTH]: AuthState;
}

export const appReducers = combineReducers({
    ...fromAuth.authReducers,
});
