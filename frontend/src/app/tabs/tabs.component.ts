import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { boatSharp, settingsSharp, logInSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { AuthenticationFacadeService } from './auth/auth-facade.service';

@Component({
    standalone: true,
    imports: [AsyncPipe, TranslocoModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
    selector: 'car-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['tabs.component.scss'],
})
export class TabsComponent {
    private _authenticationFacadeService = inject(AuthenticationFacadeService);

    isAuthenticated$ = this._authenticationFacadeService.selectUserData();

    constructor() {
        addIcons({ boatSharp, settingsSharp, logInSharp });
    }
}
