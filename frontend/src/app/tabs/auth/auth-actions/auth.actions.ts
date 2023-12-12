import { createAction, props } from '@ngrx/store';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { User } from '../../../api/models/user';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';

export const sendSMS = createAction('[Authentication] Send SMS');

export const setLoading = createAction(
    '[Authentication] Set SMS Loading',
    props<{ isLoading: boolean }>(),
);

export const sendSMSSuccess = createAction(
    '[Authentication] Send SMS Success',
    props<{ response: StatusResponse }>(),
);

export const verifyCode = createAction('[Authentication] Verify Code', props<{ code: string }>());

export const verifyCodeSuccess = createAction(
    '[Authentication] Verify Code Success',
    props<{ response: StatusResponse }>(),
);

export const getEmailExists = createAction(
    '[Authentication] Get Email Exists',
    props<{ email: string }>(),
);

export const setEmailExists = createAction(
    '[Authentication] Set Email Exists',
    props<{ emailExists: boolean }>(),
);

export const registerUser = createAction('[Authentication] Register User', props<{ user: User }>());

export const loginUserSuccess = createAction(
    '[Authentication] Login User Success',
    props<{ userData: UserData }>(),
);

//------------------ AUTOLOGIN ----------------------------
export const startAutologin = createAction('[Authentication] Start Autologin');

export const startAutologinError = createAction('[Authentication] Start Autologin Error');
