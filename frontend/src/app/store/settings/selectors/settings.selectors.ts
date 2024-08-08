import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKeys } from '../../../constants/feature-keys';
import { SettingsState } from '../reducers/settings.reducer';

export const selectSettingsState = createFeatureSelector<SettingsState>(FeatureKeys.SETTINGS);

export const selectProfileDetails = createSelector(
    selectSettingsState,
    (state: SettingsState) => state.profileDetails,
);

export const selectIsNotLoading = createSelector(
    selectSettingsState,
    (state: SettingsState) => !state.isLoading,
);
