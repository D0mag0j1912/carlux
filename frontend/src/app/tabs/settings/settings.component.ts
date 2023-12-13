import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { AuthenticationFacadeService } from '../auth/auth-facade.service';
import { AuthenticationHelperService } from '../auth/helpers/auth-helper.service';

@Component({
    standalone: true,
    imports: [CommonModule, IonicModule, TranslocoModule],
    selector: 'yac-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    constructor(
        private _authenticationFacadeService: AuthenticationFacadeService,
        private _authenticationHelperService: AuthenticationHelperService,
        private _router: Router,
    ) {}

    async logout(): Promise<void> {
        this._authenticationFacadeService.logout();
        await this._authenticationHelperService.logout();
        await this._router.navigateByUrl('/tabs/auth');
    }
}
