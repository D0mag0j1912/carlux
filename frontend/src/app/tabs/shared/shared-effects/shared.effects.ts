import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import * as SharedActions from '../shared-actions/shared.actions';

@Injectable()
export class SharedEffects {
    private _toastController = inject(ToastController);
    private _translocoService = inject(TranslocoService);

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

    constructor(private _actions$: Actions) {}
}
