import { createAction, props } from '@ngrx/store';

export const sendSMS = createAction('[Authentication] Send SMS');

export const sendSMSSuccess = createAction('[Authentication] Send SMS Success');

export const setLoading = createAction(
    '[Authentication] Set SMS Loading',
    props<{ isLoading: boolean }>(),
);

export const verifyCode = createAction('[Authentication] Verify code', props<{ code: string }>());

export const verifyCodeSuccess = createAction('[Authentication] Verify code success');
