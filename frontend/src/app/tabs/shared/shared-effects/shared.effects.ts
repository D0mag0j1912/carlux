import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import * as SharedActions from '../shared-actions/shared.actions';

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
                        cssClass: action.cssClass,
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
                        duration: action.duration,
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
                tap(async (_) => await this._loadingController.dismiss()),
            ),
        { dispatch: false },
    );
}
