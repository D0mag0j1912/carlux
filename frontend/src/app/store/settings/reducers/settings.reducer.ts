import { createReducer, on } from '@ngrx/store';
import { UserDto as User } from '../../../api';
import * as SettingsActions from '../actions/settings.actions';

export interface SettingsState {
    profileDetails: User | undefined;
}

export const initialSettingsState: SettingsState = {
    profileDetails: undefined,
};

export const settingsReducer = createReducer(
    initialSettingsState,
    on(SettingsActions.setProfileDetails, (state: SettingsState, { profileDetails }) => ({
        ...state,
        profileDetails: { ...profileDetails },
    })),
);
