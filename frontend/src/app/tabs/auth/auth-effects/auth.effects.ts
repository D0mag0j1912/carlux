import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import * as AuthActions from '../auth-actions/auth.actions';
import { AuthenticationService } from '../../../api/services';
import { AuthenticationFacadeService } from '../auth-facade.service';
import { TOAST_DURATION } from '../../../constants/toast-duration';
import { SharedFacadeService } from '../../shared/shared-facade.service';
import { AuthenticationEventEmitterService } from '../auth-event-emitter/auth-event-emitter.service';

@Injectable()
export class AuthEffects {
    #actions$ = inject(Actions);
    #sharedFacadeService = inject(SharedFacadeService);
    #authenticationService = inject(AuthenticationService);
    #authenticationFacadeService = inject(AuthenticationFacadeService);
    #authenticationEventEmitterService = inject(AuthenticationEventEmitterService);

    sendSMS$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AuthActions.sendSMS),
            tap((_) => this.#authenticationFacadeService.setLoading(true)),
            switchMap((_) =>
                this.#authenticationService.authControllerSendSms({ body: '' }).pipe(
                    catchError((_) => {
                        this.#sharedFacadeService.showToastMessage(
                            'auth.errors.sms_error',
                            TOAST_DURATION.ERROR,
                            'warning',
                            'toast--error',
                        );
                        this.#authenticationEventEmitterService;
                        return EMPTY;
                    }),
                    map((_) => {
                        this.#authenticationEventEmitterService.emitSmsSent();
                        return AuthActions.sendSMSSuccess();
                    }),
                    finalize(() => this.#authenticationFacadeService.setLoading(false)),
                ),
            ),
        ),
    );

    verifyCode$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AuthActions.verifyCode),
            switchMap((action) =>
                this.#authenticationService
                    .authControllerVerifyCode({ body: { code: +action.code } })
                    .pipe(
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
}
