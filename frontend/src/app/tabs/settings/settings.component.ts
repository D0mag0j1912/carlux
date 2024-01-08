import { Component, inject } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { languageSharp } from 'ionicons/icons';
import { AuthenticationFacadeService } from '../auth/auth-facade.service';

@Component({
    standalone: true,
    imports: [
        TranslocoModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
        IonNote,
    ],
    selector: 'yac-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    private _authenticationFacadeService = inject(AuthenticationFacadeService);

    readonly LANGUAGES_COUNT = 2;

    constructor() {
        addIcons({ languageSharp });
    }

    logout(): void {
        this._authenticationFacadeService.logout();
    }
}
