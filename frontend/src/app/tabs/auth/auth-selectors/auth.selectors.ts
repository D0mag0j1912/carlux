import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth-reducers/auth.reducers';
import { FeatureKeys } from '../../../constants/feature-keys';

export const selectAuthState = createFeatureSelector<AuthState>(FeatureKeys.AUTH);

//--------------SELECTORS START--------------
export const selectLoading = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.isLoading,
);

export const selectSMSResponse = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.smsResponse,
);

export const selectVerifyCodeResponse = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.verifyCodeResponse,
);

export const selectIsEmailAvailable = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.isEmailAvailable,
);
//--------------SELECTORS END--------------
