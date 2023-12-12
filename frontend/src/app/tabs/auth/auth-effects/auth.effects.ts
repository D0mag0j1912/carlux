import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, concatMap, finalize, map, switchMap, tap } from 'rxjs';
import { Storage } from '@capacitor/storage';
import * as AuthenticationActions from '../auth-actions/auth.actions';
import { AuthenticationService } from '../../../api/services';
import { AuthenticationFacadeService } from '../auth-facade.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/shared-facade.service';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { AuthenticationEventEmitterService } from '../event-emitter/auth-event-emitter.service';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import { AuthenticationHelperService } from '../helpers/auth-helper.service';

@Injectable()
export class AuthEffects {
    sendSMS$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthenticationActions.sendSMS),
            tap((_) => this._authenticationFacadeService.setLoading(true)),
            switchMap((_) =>
                this._authenticationService.authControllerSendSms({ body: '' }).pipe(
                    catchError((_) => {
                        this._sharedFacadeService.showToastMessage(
                            'auth.errors.sms_error',
                            POPUP_DURATIONS.ERROR,
                            'warning',
                        );
                        return EMPTY;
                    }),
                    map((response: StatusResponse) =>
                        AuthenticationActions.sendSMSSuccess({ response }),
                    ),
                    finalize(() => this._authenticationFacadeService.setLoading(false)),
                ),
            ),
        ),
    );

    verifyCode$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthenticationActions.verifyCode),
            tap((_) =>
                this._sharedFacadeService.showLoadingIndicator('auth.loading.verifying_code'),
            ),
            switchMap((action) =>
                this._authenticationService
                    .authControllerVerifyCode({ body: { code: +action.code } })
                    .pipe(
                        catchError((_) => {
                            this._sharedFacadeService.showToastMessage(
                                'auth.errors.verify_code_error',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((response: StatusResponse) =>
                            AuthenticationActions.verifyCodeSuccess({ response }),
                        ),
                        finalize(() => this._sharedFacadeService.dismissLoadingIndicator()),
                    ),
            ),
        ),
    );

    emailExists$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthenticationActions.getEmailExists),
            switchMap((action) =>
                this._authenticationService.authControllerEmailExists({ email: action.email }).pipe(
                    catchError((_) => {
                        this._sharedFacadeService.showToastMessage(
                            'common.errors.generic',
                            POPUP_DURATIONS.ERROR,
                            'warning',
                        );
                        return EMPTY;
                    }),
                    map((emailExists: boolean) =>
                        AuthenticationActions.setEmailExists({ emailExists }),
                    ),
                    tap((_) => {
                        this._authenticationEventEmitterService.emitEmailExistsSuccess();
                    }),
                ),
            ),
        ),
    );

    registerUser$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthenticationActions.registerUser),
            tap((_) => this._sharedFacadeService.showLoadingIndicator('auth.loading.registering')),
            concatMap((action) =>
                this._authenticationService.authControllerRegister({ body: action.user }).pipe(
                    catchError((_) => {
                        this._sharedFacadeService.showToastMessage(
                            'auth.errors.register',
                            POPUP_DURATIONS.ERROR,
                            'warning',
                        );
                        return EMPTY;
                    }),
                    tap(async (userData: UserData) => {
                        this._authenticationHelperService.setAuthTimer(userData.expiresIn);
                        const now = new Date();
                        const expirationDate = new Date(
                            now.getTime() + (userData?.expiresIn ?? 0) * 1000,
                        ).toISOString();
                        userData = {
                            ...userData,
                            expirationDate,
                        };
                        await Storage.set({
                            key: FeatureKeys.AUTH,
                            value: JSON.stringify(userData),
                        });
                    }),
                    map((userData: UserData) => {
                        this._sharedFacadeService.dismissLoadingIndicator();
                        this._authenticationEventEmitterService.emitRegistrationSuccess();
                        return AuthenticationActions.loginUserSuccess({ userData });
                    }),
                    finalize(() => this._sharedFacadeService.dismissLoadingIndicator()),
                ),
            ),
        ),
    );

    constructor(
        private _actions$: Actions,
        private _sharedFacadeService: SharedFacadeService,
        private _authenticationService: AuthenticationService,
        private _authenticationFacadeService: AuthenticationFacadeService,
        private _authenticationEventEmitterService: AuthenticationEventEmitterService,
        private _authenticationHelperService: AuthenticationHelperService,
    ) {}
}
