import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { Observable, from, map } from 'rxjs';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import { AuthenticationFacadeService } from '../../../store/auth/facades/auth-facade.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationHelperService {
    setAuthTimer(duration: number | undefined): void {
        if (duration) {
            this._tokenTimer = setTimeout(() => {
                this._authenticationFacadeService.logout();
            }, duration * 1000);
        }
    }

    autoLogin(): Observable<boolean> {
        return from(Preferences.get({ key: FeatureKeys.AUTH })).pipe(
            map((storedData: GetResult) => {
                if (!storedData || !storedData?.value) {
                    return false;
                }
                const fetchedUserData: UserData = JSON.parse(storedData.value);
                if (!fetchedUserData.token || !fetchedUserData.expirationDate) {
                    return false;
                }
                const { expiresIn, ...signInData } = fetchedUserData;
                const now = new Date();
                if (signInData.expirationDate) {
                    const expiresIn = new Date(signInData.expirationDate).getTime() - now.getTime();
                    if (expiresIn > 0) {
                        this.setAuthTimer(expiresIn / 1000);
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            }),
        );
    }

    clearAuthenticationTimeout(): void {
        clearTimeout(this._tokenTimer);
    }

    async clearLocalStorage(): Promise<void> {
        await Preferences.remove({ key: FeatureKeys.AUTH });
    }

    private _tokenTimer: NodeJS.Timeout | undefined;

    constructor(private _authenticationFacadeService: AuthenticationFacadeService) {}
}
