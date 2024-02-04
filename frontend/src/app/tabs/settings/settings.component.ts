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
    IonAvatar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { languageSharp, personCircleOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { AuthenticationFacadeService } from '../../store/auth/facades/auth-facade.service';

@Component({
    standalone: true,
    imports: [
        TranslocoModule,
        RouterModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
        IonNote,
        IonAvatar,
    ],
    selector: 'car-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    readonly LANGUAGES_COUNT = 2;

    constructor() {
        addIcons({ languageSharp, personCircleOutline });
    }

    logout(): void {
        this._authenticationFacadeService.logout();
    }
}
