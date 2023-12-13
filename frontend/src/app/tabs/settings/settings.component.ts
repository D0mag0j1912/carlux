import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthenticationHelperService } from '../auth/helpers/auth-helper.service';

@Component({
    standalone: true,
    imports: [CommonModule, IonicModule, TranslocoModule],
    selector: 'yac-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    constructor(private _authenticationHelperService: AuthenticationHelperService) {}

    async logout(): Promise<void> {
        await this._authenticationHelperService.logout();
    }
}
