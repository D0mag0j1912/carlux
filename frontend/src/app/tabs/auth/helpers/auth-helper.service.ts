import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationHelperService {
    setAuthTimer(duration: number | undefined): void {
        if (duration) {
            this._tokenTimer = setTimeout(async () => {
                //await this.logout();
            }, duration * 1000);
        }
    }

    private _tokenTimer: NodeJS.Timeout | undefined;
}
