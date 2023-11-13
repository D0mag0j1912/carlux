import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthEventHubService {
    private _smsSentSuccessfully$ = new Subject<void>();
    smsSentSuccessfully$ = this._smsSentSuccessfully$.asObservable();

    emitSmsSending(): void {
        this._smsSentSuccessfully$.next();
    }
}
