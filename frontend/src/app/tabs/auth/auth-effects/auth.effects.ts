import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../auth-actions/auth.actions';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../../../api/services';
import { AuthFacadeService } from '../auth-facade.service';
import { TOAST_DURATION } from '../../../constants/toast-duration';
import { SharedFacadeService } from '../../shared/shared-facade.service';

@Injectable()
export class AuthEffects {
    #sharedFacadeService = inject(SharedFacadeService);

    sendSMS$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.sendSMS),
            tap((_) => this._authenticationFacadeService.setSMSLoading(true)),
            switchMap((_) =>
                this._authenticationService.authControllerSendSms({ body: '' }).pipe(
                    catchError((_) => {
                        this.#sharedFacadeService.showToastMessage(
                            'auth.errors.sms_error',
                            TOAST_DURATION.ERROR,
                            'warning',
                            'toast--error',
                        );
                        return EMPTY;
                    }),
                    map((_) => AuthActions.sendSMSSuccess()),
                    finalize(() => this._authenticationFacadeService.setSMSLoading(false)),
                ),
            ),
        ),
    );

    verifyCode$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.verifyCode),
            switchMap((action) =>
                this._authenticationService.authControllerVerifyCode({ body: action.code }).pipe(
                    catchError(async (_) => {
                        this.#sharedFacadeService.showToastMessage(
                            'auth.errors.verify_code_error',
                            TOAST_DURATION.ERROR,
                            'warning',
                            'toast--error',
                        );
                        return EMPTY;
                    }),
                    map((_) => AuthActions.verifyCodeSuccess()),
                ),
            ),
        ),
    );

    constructor(
        private _actions$: Actions,
        private _authenticationService: AuthenticationService,
        private _authenticationFacadeService: AuthFacadeService,
    ) {}
}
