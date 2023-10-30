import { createReducer, on } from '@ngrx/store';
import { Platforms } from '@ionic/core';
import * as PlatformActions from '../platform-actions/platform-actions';

export interface PlatformState {
    platforms: Platforms[];
}

export const platformInitialState: PlatformState = {
    platforms: [],
};

export const platformReducers = createReducer(
    platformInitialState,
    on(PlatformActions.setPlatform, (state, { platforms }) => ({
        ...state,
        platforms,
    })),
);
