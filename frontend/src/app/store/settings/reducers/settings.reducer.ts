import { createReducer } from '@ngrx/store';
import { UserDto as User } from '../../../api';

export interface SettingsState {
    profileDetails: User | undefined;
}

export const initialSettingsState: SettingsState = {
    profileDetails: undefined,
};

export const settingsReducer = createReducer(initialSettingsState);
