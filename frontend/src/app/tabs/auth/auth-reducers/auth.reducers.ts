import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth-actions/auth.actions';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';

export interface AuthState {
    isLoading: boolean;
    smsResponse: StatusResponse | undefined;
    verifyCodeResponse: StatusResponse | undefined;
    emailExists: boolean;
    userData: UserData | undefined;
}

export const initialAuthState: AuthState = {
    isLoading: false,
    smsResponse: undefined,
    verifyCodeResponse: undefined,
    emailExists: true,
    userData: undefined,
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
    on(AuthActions.verifyCodeSuccess, (state, { response }) => ({
        ...state,
        verifyCodeResponse: { ...response },
    })),
    on(AuthActions.setEmailExists, (state, { emailExists }) => ({
        ...state,
        emailExists,
    })),
    on(AuthActions.registerUserSuccess, (state, { userData }) => ({
        ...state,
        userData: { ...userData },
    })),
);
