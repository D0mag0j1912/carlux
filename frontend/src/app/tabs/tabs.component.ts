import { Component, OnInit } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';
import { from, take } from 'rxjs';
import { FeatureKeys } from '../constants/feature-keys';
import { LoginResponseDto as UserData } from '../api/models/login-response-dto';
import { AuthenticationFacadeService } from './auth/auth-facade.service';

@Component({
    selector: 'yac-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['tabs.component.scss'],
})
export class TabsComponent implements OnInit {
    isAuthenticated$ = this._authenticationFacadeService.selectUserData();

    constructor(private _authenticationFacadeService: AuthenticationFacadeService) {}

    ngOnInit(): void {
        from(Storage.get({ key: FeatureKeys.AUTH }))
            .pipe(take(1))
            .subscribe((storedData: GetResult) => {
                if (!storedData || !storedData.value) {
                    return;
                }
                const fetchedUserData: UserData = JSON.parse(storedData.value);
                if (fetchedUserData.token && fetchedUserData.expirationDate) {
                    this._authenticationFacadeService.loginUserSuccess(fetchedUserData);
                }
            });
    }
}
