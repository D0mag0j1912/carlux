import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { PlatformFacadeService } from '../platform/platform-facade/platform-facade.service';
import { AuthenticationService } from '../../api/services';
import { EMPTY, catchError } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { TOAST_DURATION } from '../../helpers/toast-duration';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    isDesktopMode$ = this._platformFacadeService.selectIsDesktopMode();
    isVerificationOpened = signal<boolean>(false);

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });
    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    constructor(
        private _platformFacadeService: PlatformFacadeService,
        private _authService: AuthenticationService,
        private _translocoService: TranslocoService,
        private _toastController: ToastController,
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
        this._authService
            .authControllerSendSms()
            .pipe(
                catchError(async (_) => {
                    const toast = await this._toastController.create({
                        message: this._translocoService.translate('auth.errors.sms_error'),
                        duration: TOAST_DURATION.ERROR,
                        icon: 'warning',
                        cssClass: 'toast--error',
                    });
                    await toast.present();
                    return EMPTY;
                }),
            )
            .subscribe((_) => {});
    }

    closeVerificationModal(): void {
        this.isVerificationOpened.set(false);
    }
}
