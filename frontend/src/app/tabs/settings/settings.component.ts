import { Component, OnInit, inject } from '@angular/core';
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
import { filter, take } from 'rxjs';
import { AuthenticationFacadeService } from '../../store/auth/facades/auth-facade.service';
import { SettingsFacadeService } from '../../store/settings/facades/settings-facade.service';

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
export class SettingsComponent implements OnInit {
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _settingsFacadeService = inject(SettingsFacadeService);
    readonly LANGUAGES_COUNT = 2;

    constructor() {
        addIcons({ languageSharp, personCircleOutline });
    }

    ngOnInit(): void {
        this._authenticationFacadeService
            .selectUserId()
            .pipe(filter(Boolean), take(1))
            .subscribe((userId: number) => this._settingsFacadeService.getProfileDetails(userId));
    }

    logout(): void {
        this._authenticationFacadeService.logout();
    }
}
