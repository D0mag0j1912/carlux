import { createReducer } from '@ngrx/store';

export interface AuthState {}

export const initialAuthState: AuthState = {};

export const authReducer = createReducer(initialAuthState);
