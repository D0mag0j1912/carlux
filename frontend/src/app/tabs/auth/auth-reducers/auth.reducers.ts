import { createReducer } from '@ngrx/store';

export interface AuthState {}

export const initialAuthState: AuthState = {};

export const authReducers = createReducer(initialAuthState);
