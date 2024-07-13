import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../index';
import { PopupDurationsValuesType } from '../../../models/popup-durations.type';
import * as SharedActions from '../actions/shared.actions';

@Injectable({ providedIn: 'root' })
export class SharedFacadeService {
    #store = inject(Store<AppState>);

    //Actions BEGIN ---------------------------
    showToastMessage(message: string, duration: PopupDurationsValuesType, icon: 'warning'): void {
        this.#store.dispatch(SharedActions.showToastMessage({ message, duration, icon }));
    }

    showLoadingIndicator(message: string): void {
        this.#store.dispatch(SharedActions.showLoadingIndicator({ message }));
    }

    dismissLoadingIndicator(): void {
        this.#store.dispatch(SharedActions.dismissLoadingIndicator());
    }
    //Actions END ---------------------------
}
