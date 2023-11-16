import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth-actions/auth.actions';

export interface AuthState {
    isSMSLoading: boolean;
}

export const initialAuthState: AuthState = {
    isSMSLoading: false,
};

export const authReducers = createReducer(
    initialAuthState,
    on(AuthActions.setSMSLoading, (state, { isSMSLoading }) => ({
        ...state,
        isSMSLoading,
    })),
);
