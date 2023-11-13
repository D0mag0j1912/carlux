import { createReducer } from '@ngrx/store';

export interface AuthState {
    isSMSLoading: boolean;
}

export const initialAuthState: AuthState = {
    isSMSLoading: false,
};

export const authReducers = createReducer(initialAuthState);
