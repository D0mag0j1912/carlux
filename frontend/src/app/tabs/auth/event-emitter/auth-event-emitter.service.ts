import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationEventEmitterService {
    private _registrationSuccess$ = new Subject<void>();

    getRegistrationSuccess(): Observable<void> {
        return this._registrationSuccess$;
    }

    emitRegistrationSuccess(): void {
        this._registrationSuccess$.next();
    }

    private _emailExistsSuccess$ = new Subject<void>();

    getEmailExistsSuccess(): Observable<void> {
        return this._emailExistsSuccess$;
    }

    emitEmailExistsSuccess(): void {
        this._emailExistsSuccess$.next();
    }
}
