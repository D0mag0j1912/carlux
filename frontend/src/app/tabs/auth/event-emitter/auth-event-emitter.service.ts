import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type AuthenticationEventEmitterType = 'signIn' | 'signUp';

@Injectable({ providedIn: 'root' })
export class AuthenticationEventEmitterService {
    private _authSuccess$ = new Subject<{ type: AuthenticationEventEmitterType }>();

    getAuthSuccess(): Observable<{ type: AuthenticationEventEmitterType }> {
        return this._authSuccess$;
    }

    emitAuthSuccess(type: AuthenticationEventEmitterType): void {
        this._authSuccess$.next({ type });
    }

    //------------- Email exists ------------------------
    private _emailExistsSuccess$ = new Subject<void>();

    getEmailExistsSuccess(): Observable<void> {
        return this._emailExistsSuccess$;
    }

    emitEmailExistsSuccess(): void {
        this._emailExistsSuccess$.next();
    }
}
