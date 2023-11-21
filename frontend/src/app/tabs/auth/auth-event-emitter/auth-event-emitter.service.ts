import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationEventEmitterService {
    #smsSent$ = new Subject<void>();

    getSmsSent(): Observable<void> {
        return this.#smsSent$.asObservable();
    }

    emitSmsSent(): void {
        this.#smsSent$.next();
    }
}
