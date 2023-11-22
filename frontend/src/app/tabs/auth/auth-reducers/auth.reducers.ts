import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth-actions/auth.actions';

export interface AuthState {
    isLoading: boolean;
}

export const initialAuthState: AuthState = {
    isLoading: false,
};

export const authReducers = createReducer(
    initialAuthState,
    on(AuthActions.setLoading, (state, { isLoading }) => ({
        ...state,
        isLoading,
    })),
);
