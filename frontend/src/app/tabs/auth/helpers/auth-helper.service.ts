import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { GetResult, Storage } from '@capacitor/storage';
import { FeatureKeys } from '../../../constants/feature-keys';
import { LoginResponseDto as UserData } from '../../../api/models/login-response-dto';
import { AuthenticationFacadeService } from '../auth-facade.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationHelperService {
    setAuthTimer(duration: number | undefined): void {
        if (duration) {
            this._tokenTimer = setTimeout(async () => {
                //await this.logout();
            }, duration * 1000);
        }
    }

    autoLogin(): Observable<boolean> {
        return from(Storage.get({ key: FeatureKeys.AUTH })).pipe(
            map((storedData: GetResult) => {
                if (!storedData || !storedData?.value) {
                    return false;
                }
                const fetchedUserData: UserData = JSON.parse(storedData.value);
                if (!fetchedUserData.token || !fetchedUserData.expirationDate) {
                    return false;
                }
                const { expiresIn, ...loginUserData } = fetchedUserData;
                const now = new Date();
                if (loginUserData.expirationDate) {
                    const expiresIn =
                        new Date(loginUserData.expirationDate).getTime() - now.getTime();
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

    private _tokenTimer: NodeJS.Timeout | undefined;

    constructor(private _authenticationFacadeService: AuthenticationFacadeService) {}
}
