import { createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from '../actions/auth.actions';
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
    on(AuthenticationActions.setLoading, (state, { isLoading }) => ({
        ...state,
        isLoading,
    })),
    on(AuthenticationActions.sendSMSSuccess, (state, { response }) => ({
        ...state,
        smsResponse: { ...response },
    })),
    on(AuthenticationActions.verifyCodeSuccess, (state, { response }) => ({
        ...state,
        verifyCodeResponse: { ...response },
    })),
    on(AuthenticationActions.setEmailExists, (state, { emailExists }) => ({
        ...state,
        emailExists,
    })),
    on(AuthenticationActions.signInSuccess, (state, { userData }) => ({
        ...state,
        userData: { ...userData },
    })),
    on(AuthenticationActions.logout, (state) => ({
        ...state,
        userData: undefined,
    })),
);
