import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { warning } from 'ionicons/icons';
import * as SharedActions from '../actions/shared.actions';

@Injectable()
export class SharedEffects {
    private _toastController = inject(ToastController);
    private _loadingController = inject(LoadingController);
    private _translocoService = inject(TranslocoService);
    private _actions$ = inject(Actions);

    showToastMessage$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(SharedActions.showToastMessage),
                tap(async (action) => {
                    const toast = await this._toastController.create({
                        message: this._translocoService.translate(action.message),
                        duration: action.duration,
                        icon: action.icon,
                        cssClass: action.icon === 'warning' ? 'toast--error' : 'toast--success',
                    });
                    await toast.present();
                }),
            ),
        { dispatch: false },
    );

    showLoadingIndicator$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(SharedActions.showLoadingIndicator),
                tap(async (action) => {
                    const loading = await this._loadingController.create({
                        message: this._translocoService.translate(action.message),
                    });

                    await loading.present();
                }),
            ),
        { dispatch: false },
    );

    dismissLoadingIndicator$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(SharedActions.dismissLoadingIndicator),
                tap((_) => {
                    setTimeout(async () => {
                        await this._loadingController.dismiss();
                    }, 100);
                }),
            ),
        { dispatch: false },
    );

    constructor() {
        addIcons({ warning });
    }
}
