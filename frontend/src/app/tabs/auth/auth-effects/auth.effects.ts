import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, concatMap, finalize, map, switchMap, tap } from 'rxjs';
import * as AuthActions from '../auth-actions/auth.actions';
import { AuthenticationService } from '../../../api/services';
import { AuthenticationFacadeService } from '../auth-facade.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/shared-facade.service';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { AuthenticationEventEmitterService } from '../event-emitter/auth-event-emitter.service';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';

@Injectable()
export class AuthEffects {
    private _actions$ = inject(Actions);
    private _sharedFacadeService = inject(SharedFacadeService);
    private _authenticationService = inject(AuthenticationService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _authenticationEventEmitterService = inject(AuthenticationEventEmitterService);

    sendSMS$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.sendSMS),
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
                    map((response: StatusResponse) => AuthActions.sendSMSSuccess({ response })),
                    finalize(() => this._authenticationFacadeService.setLoading(false)),
                ),
            ),
        ),
    );

    verifyCode$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.verifyCode),
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
                            AuthActions.verifyCodeSuccess({ response }),
                        ),
                        finalize(() => this._sharedFacadeService.dismissLoadingIndicator()),
                    ),
            ),
        ),
    );

    emailExists$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.getEmailExists),
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
                    map((emailExists: boolean) => AuthActions.setEmailExists({ emailExists })),
                    tap((_) => {
                        this._authenticationEventEmitterService.emitEmailExistsSuccess();
                    }),
                ),
            ),
        ),
    );

    registerUser$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.registerUser),
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
                    map((userData: UserData) => {
                        this._sharedFacadeService.dismissLoadingIndicator();
                        this._authenticationEventEmitterService.emitRegistrationSuccess();
                        return AuthActions.registerUserSuccess({ userData });
                    }),
                ),
            ),
        ),
    );
}
