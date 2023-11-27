import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import * as AuthActions from '../auth-actions/auth.actions';
import { AuthenticationService } from '../../../api/services';
import { AuthenticationFacadeService } from '../auth-facade.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/shared-facade.service';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';

@Injectable()
export class AuthEffects {
    private _actions$ = inject(Actions);
    private _sharedFacadeService = inject(SharedFacadeService);
    private _authenticationService = inject(AuthenticationService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);

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
                            'toast--error',
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
                this._sharedFacadeService.showLoadingIndicator(
                    'auth.verifying_code',
                    POPUP_DURATIONS.STANDARD,
                ),
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
                                'toast--error',
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
}
