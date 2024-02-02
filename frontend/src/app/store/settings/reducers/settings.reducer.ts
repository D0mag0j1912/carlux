import { createReducer, on } from '@ngrx/store';
import { UserDto as User } from '../../../api';
import * as SettingsActions from '../actions/settings.actions';

export interface SettingsState {
    profileDetails: User | undefined;
    isLoading: boolean;
}

export const initialSettingsState: SettingsState = {
    profileDetails: undefined,
    isLoading: false,
};

export const settingsReducer = createReducer(
    initialSettingsState,
    on(SettingsActions.setProfileDetails, (state: SettingsState, { profileDetails }) => ({
        ...state,
        profileDetails: { ...profileDetails },
    })),
    on(SettingsActions.setLoading, (state: SettingsState, { isLoading }) => ({
        ...state,
        isLoading,
    })),
);
