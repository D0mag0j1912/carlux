import { Platforms } from '@ionic/core';
import { combineReducers } from '@ngrx/store';

export const platformStoreKey = 'platform';

export interface AppState {
    [platformStoreKey]: Platforms[];
}

export const appReducers = combineReducers({});
