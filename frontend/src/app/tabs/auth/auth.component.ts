import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { PlatformFacadeService } from '../platform/platform-facade/platform-facade.service';
import { AuthenticationService } from '../../api/services';

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    isDesktopMode$ = this._platformFacadeService.selectIsDesktopMode();

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });
    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    constructor(
        private _platformFacadeService: PlatformFacadeService,
        private _authService: AuthenticationService,
    ) {}

    ngAfterViewInit(): void {
        if (this.phoneEl) {
            intlTelInput(this.phoneEl.nativeElement, {
                initialCountry: 'hr',
                separateDialCode: true,
                utilsScript: this.UTILS_SCRIPT,
            });
        }
    }

    continueWithPhoneNumber(): void {
        this._authService.authControllerSendSms().subscribe();
    }
}
