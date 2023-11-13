import { Injectable } from '@angular/core';
import { AppState } from '../..';
import { Store } from '@ngrx/store';
import { FeatureKeys } from '../../constants/feature-keys';
import * as AuthActions from './auth-actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
    constructor(private _store: Store<AppState[FeatureKeys.AUTH]>) {}

    //Selectors BEGIN -------------------------
    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    sendSMS(): void {
        this._store.dispatch(AuthActions.sendSMS());
    }

    setSMSLoading(isSMSLoading: boolean): void {
        this._store.dispatch(AuthActions.setSMSLoading({ isSMSLoading }));
    }
    //Actions END ---------------------------
}
