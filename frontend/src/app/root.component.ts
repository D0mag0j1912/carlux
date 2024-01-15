import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Platforms } from '@ionic/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { filter, take } from 'rxjs';
import { PlatformFacadeService } from './tabs/platform/platform-facade/platform-facade.service';
import { AuthenticationFacadeService } from './tabs/auth/auth-facade.service';
import { PreferencesFacadeService } from './tabs/preferences/preferences-facade.service';

@Component({
    standalone: true,
    imports: [IonApp, IonRouterOutlet],
    selector: 'yac-root',
    templateUrl: 'root.component.html',
    styleUrls: ['root.component.scss'],
})
export class RootComponent implements OnInit {
    private _platform = inject(Platform);
    private _platformFacadeService = inject(PlatformFacadeService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _preferencesFacadeService = inject(PreferencesFacadeService);

    ngOnInit(): void {
        const currentPlatforms = this._platform.platforms() as Platforms[];
        this._platformFacadeService.setPlatform(currentPlatforms);

        this._authenticationFacadeService
            .selectUserId()
            .pipe(take(2), filter(Boolean))
            .subscribe((userId: number) => {
                this._preferencesFacadeService.getPreferences(userId);
            });
    }
}
