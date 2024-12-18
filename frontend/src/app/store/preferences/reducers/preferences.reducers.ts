import { createReducer, on } from '@ngrx/store';
import { PreferencesDto as Preferences } from '../../../api/models/preferences-dto';
import * as PreferencesActions from '../actions/preferences.actions';

export interface PreferencesState {
    userPreferences: Preferences | undefined;
}

export const initialState: PreferencesState = {
    userPreferences: undefined,
};

export const preferencesReducers = createReducer(
    initialState,
    on(PreferencesActions.setPreferences, (state: PreferencesState, { preferences }) => ({
        ...state,
        userPreferences: { ...preferences },
    })),
    on(
        PreferencesActions.changeLanguageSuccess,
        (state: PreferencesState, { updatedLanguageCode }) => {
            if (state.userPreferences) {
                return {
                    ...state,
                    userPreferences: {
                        ...state.userPreferences,
                        languageCode: updatedLanguageCode,
                    },
                };
            }
            return { ...state };
        },
    ),
);
