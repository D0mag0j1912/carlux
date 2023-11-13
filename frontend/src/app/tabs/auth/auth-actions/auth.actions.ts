import { createAction, props } from '@ngrx/store';

export const sendSMS = createAction('[Authentication] Send SMS');

export const sendSMSSuccess = createAction('[Authentication] Send SMS Success');

export const setSMSLoading = createAction(
    '[Authentication] Set SMS Loading',
    props<{ isSMSLoading: boolean }>(),
);
