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
}
