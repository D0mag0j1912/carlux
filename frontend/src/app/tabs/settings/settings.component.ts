
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthenticationFacadeService } from '../auth/auth-facade.service';

@Component({
    standalone: true,
    imports: [IonicModule, TranslocoModule],
    selector: 'yac-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    readonly LANGUAGES_COUNT = 2;

    constructor(private _authenticationFacadeService: AuthenticationFacadeService) {}

    logout(): void {
        this._authenticationFacadeService.logout();
    }
}
