import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth-reducers/auth.reducers';
import { FeatureKeys } from '../../../constants/feature-keys';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';

export const selectAuthState = createFeatureSelector<AuthState>(FeatureKeys.AUTH);

//--------------SELECTORS START--------------
export const selectIsNotLoading = createSelector(
    selectAuthState,
    (authState: AuthState) => !authState.isLoading,
);

export const selectSMSResponse = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.smsResponse,
);

export const selectVerifyCodeResponse = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.verifyCodeResponse,
);

export const selectEmailExists = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.emailExists,
);

export const selectUserData = createSelector(
    selectAuthState,
    (authState: AuthState) => authState?.userData,
);

export const selectUserId = createSelector(
    selectUserData,
    (userData: UserData | undefined) => userData?.userId,
);
//--------------SELECTORS END--------------
