import { createAction, props } from '@ngrx/store';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { User } from '../../../api/models/user';

export const sendSMS = createAction('[Authentication] Send SMS');

export const setLoading = createAction(
    '[Authentication] Set SMS Loading',
    props<{ isLoading: boolean }>(),
);

export const sendSMSSuccess = createAction(
    '[Authentication] Send SMS Success',
    props<{ response: StatusResponse }>(),
);

export const verifyCode = createAction('[Authentication] Verify code', props<{ code: string }>());

export const verifyCodeSuccess = createAction(
    '[Authentication] Verify code success',
    props<{ response: StatusResponse }>(),
);

export const registerUser = createAction('[Authentication] Register user', props<{ user: User }>());
