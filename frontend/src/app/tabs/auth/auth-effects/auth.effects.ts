import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../auth-actions/auth.actions';
import { EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../../../api/services';
import { AuthFacadeService } from '../auth-facade.service';
import { ToastController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { TOAST_DURATION } from '../../../helpers/toast-duration';
import { AuthEventHubService } from '../auth-event-hub.service';

@Injectable()
export class AuthEffects {
    sendSMS$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.sendSMS),
            tap((_) => this._authenticationFacadeService.setSMSLoading(true)),
            switchMap((_) =>
                this._authenticationService.authControllerSendSms().pipe(
                    catchError(async (_) => {
                        const toast = await this._toastController.create({
                            message: this._translocoService.translate('auth.errors.sms_error'),
                            duration: TOAST_DURATION.ERROR,
                            icon: 'warning',
                            cssClass: 'toast--error',
                        });
                        await toast.present();
                        this._authenticationFacadeService.setSMSLoading(false);
                        return EMPTY;
                    }),
                    map((_) => {
                        this._authenticationFacadeService.setSMSLoading(false);
                        this._authEventHubService.emitSmsSending();
                        return AuthActions.sendSMSSuccess();
                    }),
                ),
            ),
        ),
    );

    constructor(
        private _actions$: Actions,
        private _toastController: ToastController,
        private _translocoService: TranslocoService,
        private _authenticationService: AuthenticationService,
        private _authenticationFacadeService: AuthFacadeService,
        private _authEventHubService: AuthEventHubService,
    ) {}
}
