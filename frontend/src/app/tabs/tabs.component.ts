import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { bookmarkSharp, carSportSharp, logInSharp, settingsSharp } from 'ionicons/icons';
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
        addIcons({ carSportSharp, settingsSharp, logInSharp, bookmarkSharp });
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
