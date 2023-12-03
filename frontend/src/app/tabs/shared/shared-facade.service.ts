import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../index';
import { PopupDurationsValuesType } from './models/popup-durations.type';
import * as SharedActions from './shared-actions/shared.actions';

@Injectable({ providedIn: 'root' })
export class SharedFacadeService {
    constructor(private _store: Store<AppState>) {}

    //Actions BEGIN ---------------------------
    showToastMessage(message: string, duration: PopupDurationsValuesType, icon: 'warning'): void {
        this._store.dispatch(SharedActions.showToastMessage({ message, duration, icon }));
    }

    showLoadingIndicator(message: string, duration: PopupDurationsValuesType): void {
        this._store.dispatch(SharedActions.showLoadingIndicator({ message, duration }));
    }

    dismissLoadingIndicator(): void {
        this._store.dispatch(SharedActions.dismissLoadingIndicator());
    }
    //Actions END ---------------------------
}
