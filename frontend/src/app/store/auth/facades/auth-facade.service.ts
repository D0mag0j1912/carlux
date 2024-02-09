import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import { FeatureKeys } from '../../../constants/feature-keys';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { UserDto as User } from '../../../api/models/user-dto';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';
import * as AuthenticationActions from '../actions/auth.actions';
import * as AuthenticationSelectors from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.AUTH]>);

    private _selectIsNotLoading$ = this._store.select(AuthenticationSelectors.selectIsNotLoading);

    private _selectSMSResponse$ = this._store.select(AuthenticationSelectors.selectSMSResponse);

    private _selectVerifyCodeResponse$ = this._store.select(
        AuthenticationSelectors.selectVerifyCodeResponse,
    );

    private _selectEmailExists$ = this._store.select(AuthenticationSelectors.selectEmailExists);

    private _selectUserData$ = this._store.select(AuthenticationSelectors.selectUserData);

    private _selectUserId$ = this._store.select(AuthenticationSelectors.selectUserId);

    //Selectors BEGIN -------------------------
    selectIsNotLoading(): Observable<boolean> {
        return this._selectIsNotLoading$;
    }

    selectSMSResponse(): Observable<StatusResponse | undefined> {
        return this._selectSMSResponse$;
    }

    selectVerifyCodeResponse(): Observable<StatusResponse | undefined> {
        return this._selectVerifyCodeResponse$;
    }

    selectEmailExists(): Observable<boolean> {
        return this._selectEmailExists$;
    }

    selectUserData(): Observable<UserData | undefined> {
        return this._selectUserData$;
    }

    selectUserId(): Observable<number | undefined> {
        return this._selectUserId$;
    }
    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    sendSMS(): void {
        this._store.dispatch(AuthenticationActions.sendSMS());
    }

    setLoading(isLoading: boolean): void {
        this._store.dispatch(AuthenticationActions.setLoading({ isLoading: isLoading }));
    }

    verifyCode(code: string): void {
        this._store.dispatch(AuthenticationActions.verifyCode({ code }));
    }

    getEmailExists(email: string): void {
        this._store.dispatch(AuthenticationActions.getEmailExists({ email }));
    }

    registerUser(user: User): void {
        this._store.dispatch(AuthenticationActions.registerUser({ user }));
    }

    logout(): void {
        this._store.dispatch(AuthenticationActions.logout());
    }

    signIn(email: string): void {
        this._store.dispatch(AuthenticationActions.signIn({ email }));
    }

    signInSuccess(userData: UserData): void {
        this._store.dispatch(AuthenticationActions.signInSuccess({ userData }));
    }
    //Actions END ---------------------------
}