import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SharedActions from '../shared-actions/shared.actions';
import { tap } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class SharedEffects {
    #toastController = inject(ToastController);
    #translocoService = inject(TranslocoService);

    showToastMessage$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(SharedActions.showToastMessage),
                tap(async (action) => {
                    const toast = await this.#toastController.create({
                        message: this.#translocoService.translate(action.message),
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
