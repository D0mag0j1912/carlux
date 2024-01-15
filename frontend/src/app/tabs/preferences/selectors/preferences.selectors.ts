import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PreferencesState } from '../reducers/preferences.reducers';
import { FeatureKeys } from '../../../constants/feature-keys';
import { PreferencesDto as Preferences } from '../../../api/models/preferences-dto';

export const selectPreferencesState = createFeatureSelector<PreferencesState>(
    FeatureKeys.PREFERENCES,
);

export const selectUserPreferences = createSelector(
    selectPreferencesState,
    (state: PreferencesState) => state.userPreferences,
);

export const selectLanguageCode = createSelector(
    selectUserPreferences,
    (userPreferences: Preferences | undefined) => userPreferences?.languageCode,
);
