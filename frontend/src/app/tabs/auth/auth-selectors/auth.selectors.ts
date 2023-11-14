import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth-reducers/auth.reducers';
import { FeatureKeys } from '../../../constants/feature-keys';

export const selectAuthState = createFeatureSelector<AuthState>(FeatureKeys.AUTH);

export const selectSMSLoading = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.isSMSLoading,
);
