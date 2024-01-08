import { Component, OnInit } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';
import { from, take } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FeatureKeys } from '../constants/feature-keys';
import { LoginResponseDto as UserData } from '../api/models/login-response-dto';
import { AuthenticationFacadeService } from './auth/auth-facade.service';

@Component({
    standalone: true,
    imports: [IonicModule, AsyncPipe, TranslocoModule],
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
                    this._authenticationFacadeService.signInSuccess(fetchedUserData);
                }
            });
    }
}
