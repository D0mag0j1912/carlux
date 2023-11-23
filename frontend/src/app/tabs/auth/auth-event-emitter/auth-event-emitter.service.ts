import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationEventEmitterService {
    private _smsSent$ = new Subject<void>();

    getSmsSent(): Observable<void> {
        return this._smsSent$.asObservable();
    }

    emitSmsSent(): void {
        this._smsSent$.next();
    }
}
