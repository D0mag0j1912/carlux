import {
    AfterViewInit,
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { PlatformFacadeService } from '../platform/platform-facade/platform-facade.service';
import { map } from 'rxjs';
import { IonInput } from '@ionic/angular';
import { AuthFacadeService } from './auth-facade.service';

type VerificationCodeType = {
    code: number | null;
};

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    isDesktopMode$ = this._platformFacadeService.selectIsDesktopMode();
    isNotSMSLoading$ = this._authFacadeService
        .selectSMSLoading()
        .pipe(map((isSMSLoading: boolean) => !isSMSLoading));

    isVerificationOpened = signal(false);
    codeValues = signal<VerificationCodeType[]>([
        {
            code: null,
        },
        {
            code: null,
        },
        {
            code: null,
        },
        {
            code: null,
        },
    ]);

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });

    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    @ViewChildren('code')
    codesEl: QueryList<IonInput> | undefined;

    constructor(
        private _authFacadeService: AuthFacadeService,
        private _platformFacadeService: PlatformFacadeService,
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
        this.isVerificationOpened.set(true);
        this._authFacadeService.sendSMS();
    }

    closeVerificationModal(): void {
        this.isVerificationOpened.set(false);
    }

    async onCodeChange(event: Event, index: number): Promise<void> {
        const value = (event.target as HTMLInputElement).value;
        const mappedArray = this.codeValues().map((codeValue, codeIndex) => {
            if (codeIndex === index) {
                const lastEnteredNumber = +value.slice(-1);
                return { code: lastEnteredNumber };
            }
            return codeValue;
        });
        this.codeValues.set([...mappedArray]);
        if (this.codesEl && value) {
            await this.codesEl.get(index + 1)?.setFocus();
        }
    }
}
