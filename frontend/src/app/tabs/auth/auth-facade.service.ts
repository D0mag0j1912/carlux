import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../..';
import { FeatureKeys } from '../../constants/feature-keys';
import { StatusResponseDto as StatusResponse } from '../../api/models/status-response-dto';
import { User } from '../../api/models/user';
import * as AuthActions from './auth-actions/auth.actions';
import * as GetCandidatesSelectors from './auth-selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacadeService {
    private _selectLoading$ = this._store.select(GetCandidatesSelectors.selectLoading);

    private _selectSMSResponse$ = this._store.select(GetCandidatesSelectors.selectSMSResponse);

    private _selectVerifyCodeResponse$ = this._store.select(
        GetCandidatesSelectors.selectVerifyCodeResponse,
    );

    private _selectIsEmailAvailable$ = this._store.select(
        GetCandidatesSelectors.selectIsEmailAvailable,
    );

    constructor(private _store: Store<AppState[FeatureKeys.AUTH]>) {}

    //Selectors BEGIN -------------------------
    selectLoading(): Observable<boolean> {
        return this._selectLoading$;
    }

    selectSMSResponse(): Observable<StatusResponse | undefined> {
        return this._selectSMSResponse$;
    }

    selectVerifyCodeResponse(): Observable<StatusResponse | undefined> {
        return this._selectVerifyCodeResponse$;
    }

    selectIsEmailAvailable(): Observable<boolean> {
        return this._selectIsEmailAvailable$;
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

    getIsEmailAvailable(email: string): void {
        this._store.dispatch(AuthActions.getIsEmailAvailable({ email }));
    }

    registerUser(user: User): void {
        this._store.dispatch(AuthActions.registerUser({ user }));
    }
    //Actions END ---------------------------
}
