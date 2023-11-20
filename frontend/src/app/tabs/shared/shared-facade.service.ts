import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../index';
import { ToastDurationValuesType } from './models/toast-duration.type';
import * as SharedActions from './shared-actions/shared.actions';

@Injectable({ providedIn: 'root' })
export class SharedFacadeService {
    constructor(private _store: Store<AppState>) {}

    //Actions BEGIN ---------------------------
    showToastMessage(
        message: string,
        duration: ToastDurationValuesType,
        icon: 'warning',
        cssClass: string,
    ): void {
        this._store.dispatch(SharedActions.showToastMessage({ message, duration, icon, cssClass }));
    }
    //Actions END ---------------------------
}
