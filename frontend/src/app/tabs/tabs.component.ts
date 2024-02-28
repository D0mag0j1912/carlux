import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { carSportSharp, settingsSharp, logInSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { filter, take } from 'rxjs';
import { AuthenticationFacadeService } from '../store/auth/facades/auth-facade.service';
import { SettingsFacadeService } from '../store/settings/facades/settings-facade.service';

@Component({
    standalone: true,
    imports: [AsyncPipe, TranslocoModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
    selector: 'car-tabs',
    templateUrl: 'tabs.component.html',
    styleUrl: 'tabs.component.scss',
})
export class TabsComponent implements OnInit {
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _settingsFacadeService = inject(SettingsFacadeService);

    isAuthenticated$ = this._authenticationFacadeService.selectUserData();

    constructor() {
        addIcons({ carSportSharp, settingsSharp, logInSharp });
    }

    ngOnInit(): void {
        this._authenticationFacadeService
            .selectUserId()
            .pipe(filter(Boolean), take(1))
            .subscribe((userId: number) => {
                this._settingsFacadeService.getProfileDetails(userId);
            });
    }
}
