import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../..';
import { FeatureKeys } from '../../constants/feature-keys';
import * as AuthActions from './auth-actions/auth.actions';
import { selectLoading } from './auth-selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacadeService {
    private _selectLoading$ = this._store.select(selectLoading);

    constructor(private _store: Store<AppState[FeatureKeys.AUTH]>) {}

    //Selectors BEGIN -------------------------
    selectLoading(): Observable<boolean> {
        return this._selectLoading$;
    }
    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    sendSMS(): void {
        this._store.dispatch(AuthActions.sendSMS());
    }

    setLoading(isLoading: boolean): void {
        this._store.dispatch(AuthActions.setLoading({ isLoading: isLoading }));
    }

    verifyCode(code: string): void {
        this._store.dispatch(AuthActions.verifyCode({ code }));
    }
    //Actions END ---------------------------
}
