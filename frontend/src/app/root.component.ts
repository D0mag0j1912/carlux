import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetResult, Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platforms } from '@ionic/core';
import { TranslocoService } from '@ngneat/transloco';
import { filter, from, take } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { LoginResponseDto as UserData } from './api/models/login-response-dto';
import { FeatureKeys } from './constants/feature-keys';
import { AuthenticationFacadeService } from './store/auth/facades/auth-facade.service';
import { PlatformFacadeService } from './store/platform/facades/platform-facade.service';
import { PreferencesFacadeService } from './store/preferences/facades/preferences-facade.service';
import { LanguageCodeType } from './tabs/settings/models/language.type';

register();
@Component({
    standalone: true,
    imports: [IonApp, IonRouterOutlet],
    selector: 'car-root',
    templateUrl: 'root.component.html',
    styleUrl: 'root.component.scss',
})
export class RootComponent implements OnInit {
    private _platform = inject(Platform);
    private _platformFacadeService = inject(PlatformFacadeService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _preferencesFacadeService = inject(PreferencesFacadeService);
    private _translocoService = inject(TranslocoService);
    private _destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        const currentPlatforms = this._platform.platforms() as Platforms[];
        this._platformFacadeService.setPlatform(currentPlatforms);

        from(Preferences.get({ key: FeatureKeys.AUTH }))
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

        this._authenticationFacadeService
            .selectUserId()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((userId: number) => {
                this._preferencesFacadeService.getPreferences(userId);
            });

        this._preferencesFacadeService
            .selectLanguageCode()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((languageCode: LanguageCodeType) => {
                this._translocoService.setActiveLang(languageCode);
            });
    }
}
