import { createReducer } from '@ngrx/store';
import { PreferencesDto as Preferences } from '../../../api/models/preferences-dto';

export interface PreferencesState {
    preferences: Preferences | undefined;
}

export const initialState: PreferencesState = {
    preferences: undefined,
};

export const preferencesReducers = createReducer(initialState);
