import { createReducer, on } from '@ngrx/store';
import { PreferencesDto as Preferences } from '../../../api/models/preferences-dto';
import * as PreferencesActions from '../actions/preferences.actions';

export interface PreferencesState {
    preferences: Preferences | undefined;
}

export const initialState: PreferencesState = {
    preferences: undefined,
};

export const preferencesReducers = createReducer(
    initialState,
    on(PreferencesActions.setPreferences, (state: PreferencesState, { preferences }) => ({
        ...state,
        preferences: { ...preferences },
    })),
);
