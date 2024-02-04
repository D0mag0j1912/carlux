import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../reducers/settings.reducer';
import { FeatureKeys } from '../../../constants/feature-keys';

export const selectSettingsState = createFeatureSelector<SettingsState>(FeatureKeys.SETTINGS);

export const selectProfileDetails = createSelector(
    selectSettingsState,
    (state: SettingsState) => state.profileDetails,
);

export const selectIsNotLoading = createSelector(
    selectSettingsState,
    (state: SettingsState) => !state.isLoading,
);
