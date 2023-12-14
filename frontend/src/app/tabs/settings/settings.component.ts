import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthenticationFacadeService } from '../auth/auth-facade.service';

@Component({
    standalone: true,
    imports: [CommonModule, IonicModule, TranslocoModule],
    selector: 'yac-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    constructor(private _authenticationFacadeService: AuthenticationFacadeService) {}

    logout(): void {
        this._authenticationFacadeService.logout();
    }
}
