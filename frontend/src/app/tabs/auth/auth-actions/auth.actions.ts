import { createAction, props } from '@ngrx/store';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';

export const sendSMS = createAction('[Authentication] Send SMS');

export const sendSMSSuccess = createAction(
    '[Authentication] Send SMS Success',
    props<{ response: StatusResponse }>(),
);

export const setLoading = createAction(
    '[Authentication] Set SMS Loading',
    props<{ isLoading: boolean }>(),
);

export const verifyCode = createAction('[Authentication] Verify code', props<{ code: string }>());

export const setVerifyCode = createAction(
    '[Authentication] Set verify code',
    props<{ response: StatusResponse | undefined }>(),
);
