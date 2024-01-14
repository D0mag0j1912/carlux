import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../..';
import { FeatureKeys } from '../../constants/feature-keys';
import * as PreferencesActions from './actions/preferences.actions';

@Injectable({ providedIn: 'root' })
export class PreferencesFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.PREFERENCES]>);

    //Actions BEGIN -------------------------
    getPreferences(userId: number): void {
        this._store.dispatch(PreferencesActions.getPreferences({ userId }));
    }
    //Actions END -------------------------

    //Selectors BEGIN -------------------------
    //Selectors END -------------------------
}
