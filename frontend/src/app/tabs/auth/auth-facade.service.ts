import { Injectable } from '@angular/core';
import { AppState } from '../..';
import { Store } from '@ngrx/store';
import { FeatureKeys } from '../../constants/feature-keys';
import * as AuthActions from './auth-actions/auth.actions';
import { selectSMSLoading } from './auth-selectors/auth.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
    private _selectSMSLoading$ = this._store.select(selectSMSLoading);

    constructor(private _store: Store<AppState[FeatureKeys.AUTH]>) {}

    //Selectors BEGIN -------------------------
    selectSMSLoading(): Observable<boolean> {
        return this._selectSMSLoading$;
    }
    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    sendSMS(): void {
        this._store.dispatch(AuthActions.sendSMS());
    }

    setSMSLoading(isSMSLoading: boolean): void {
        this._store.dispatch(AuthActions.setSMSLoading({ isSMSLoading }));
    }

    verifyCode(code: string): void {
        this._store.dispatch(AuthActions.verifyCode({ code }));
    }
    //Actions END ---------------------------
}
