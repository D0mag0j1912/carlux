import { createAction, props } from '@ngrx/store';
import { UserDto as User } from '../../../api/models/user-dto';

export const getProfileDetails = createAction(
    '[Settings] Get Profile Details',
    props<{ userId: number }>(),
);

export const setProfileDetails = createAction(
    '[Settings] Set Profile Details',
    props<{ profileDetails: User }>(),
);

export const saveProfileDetails = createAction(
    '[Settings] Save Profile Details',
    props<{ profileDetails: User }>(),
);
