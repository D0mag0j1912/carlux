import { createAction, props } from '@ngrx/store';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { User } from '../../../api/models/user';

export const sendSMS = createAction('[Authentication] Send SMS');

export const setLoading = createAction(
    '[Authentication] Set SMS loading',
    props<{ isLoading: boolean }>(),
);

export const sendSMSSuccess = createAction(
    '[Authentication] Send SMS success',
    props<{ response: StatusResponse }>(),
);

export const verifyCode = createAction('[Authentication] Verify code', props<{ code: string }>());

export const verifyCodeSuccess = createAction(
    '[Authentication] Verify code success',
    props<{ response: StatusResponse }>(),
);

export const getIsEmailAvailable = createAction(
    '[Authentication] Get is email available',
    props<{ email: string }>(),
);

export const setIsEmailAvailable = createAction(
    '[Authentication] Set is email available',
    props<{ isEmailAvailable: boolean }>(),
);

export const registerUser = createAction('[Authentication] Register user', props<{ user: User }>());

export const registerUserSuccess = createAction('[Authentication] Register user success');
