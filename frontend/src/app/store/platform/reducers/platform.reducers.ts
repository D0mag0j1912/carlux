import { Platforms } from '@ionic/core';
import { createReducer, on } from '@ngrx/store';
import * as PlatformActions from '../actions/platform.actions';

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
        platforms: [...platforms],
    })),
);
