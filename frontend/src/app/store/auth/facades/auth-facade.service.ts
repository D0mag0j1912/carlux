import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';
import { StatusResponseDto as StatusResponse } from '../../../api/models/status-response-dto';
import { UserDto as User } from '../../../api/models/user-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as AuthenticationActions from '../actions/auth.actions';
import * as AuthenticationSelectors from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacadeService {
    #store = inject(Store<AppState[FeatureKeys.AUTH]>);

    //Selectors BEGIN -------------------------
    selectIsNotLoading(): Observable<boolean> {
        return this.#store.select(AuthenticationSelectors.selectIsNotLoading);
    }

    selectSMSResponse(): Observable<StatusResponse | undefined> {
        return this.#store.select(AuthenticationSelectors.selectSMSResponse);
    }

    selectVerifyCodeResponse(): Observable<StatusResponse | undefined> {
        return this.#store.select(AuthenticationSelectors.selectVerifyCodeResponse);
    }

    selectEmailExists(): Observable<boolean> {
        return this.#store.select(AuthenticationSelectors.selectEmailExists);
    }

    selectUserData(): Observable<UserData | undefined> {
        return this.#store.select(AuthenticationSelectors.selectUserData);
    }

    selectUserId(): Observable<number | undefined> {
        return this.#store.select(AuthenticationSelectors.selectUserId);
    }
    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    sendSMS(): void {
        this.#store.dispatch(AuthenticationActions.sendSMS());
    }

    setLoading(isLoading: boolean): void {
        this.#store.dispatch(AuthenticationActions.setLoading({ isLoading: isLoading }));
    }

    verifyCode(code: string): void {
        this.#store.dispatch(AuthenticationActions.verifyCode({ code }));
    }

    getEmailExists(email: string): void {
        this.#store.dispatch(AuthenticationActions.getEmailExists({ email }));
    }

    registerUser(user: User): void {
        this.#store.dispatch(AuthenticationActions.registerUser({ user }));
    }

    logout(): void {
        this.#store.dispatch(AuthenticationActions.logout());
    }

    signIn(email: string): void {
        this.#store.dispatch(AuthenticationActions.signIn({ email }));
    }

    signInSuccess(userData: UserData): void {
        this.#store.dispatch(AuthenticationActions.signInSuccess({ userData }));
    }
    //Actions END ---------------------------
}
