import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth-actions/auth.actions';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';

export interface AuthState {
    isLoading: boolean;
    smsResponse: StatusResponse | undefined;
    verifyCodeResponse: StatusResponse | undefined;
}

export const initialAuthState: AuthState = {
    isLoading: false,
    smsResponse: undefined,
    verifyCodeResponse: undefined,
};

export const authReducers = createReducer(
    initialAuthState,
    on(AuthActions.setLoading, (state, { isLoading }) => ({
        ...state,
        isLoading,
    })),
    on(AuthActions.sendSMSSuccess, (state, { response }) => ({
        ...state,
        smsResponse: { ...response },
    })),
    on(AuthActions.setVerifyCode, (state, { response }) => ({
        ...state,
        verifyCodeResponse: response ? { ...response } : undefined,
    })),
);
