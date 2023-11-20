import {
    AfterViewInit,
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    inject,
    signal,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { PlatformFacadeService } from '../platform/platform-facade/platform-facade.service';
import { map, take } from 'rxjs';
import { IonInput, IonicModule } from '@ionic/angular';
import { AuthFacadeService } from './auth-facade.service';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

type VerificationCodeType = {
    code: number | null;
};

const INITIAL_CODE_VALUES: VerificationCodeType[] = [
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
];

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule, TranslocoModule],
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    #authFacadeService = inject(AuthFacadeService);
    #platformFacadeService = inject(PlatformFacadeService);

    isDesktopMode$ = this.#platformFacadeService.selectIsDesktopMode();
    isNotSMSLoading$ = this.#authFacadeService
        .selectSMSLoading()
        .pipe(map((isSMSLoading: boolean) => !isSMSLoading));

    isVerificationOpened = signal(false);
    codeValues = signal(INITIAL_CODE_VALUES);

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });

    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    @ViewChildren('codeEl')
    codesEl: QueryList<IonInput> | undefined;

    ngAfterViewInit(): void {
        if (this.phoneEl) {
            intlTelInput(this.phoneEl.nativeElement, {
                initialCountry: 'hr',
                separateDialCode: true,
                utilsScript: this.UTILS_SCRIPT,
            });
        }

        if (this.codesEl) {
            this.codesEl.changes.pipe(take(1)).subscribe((changes: QueryList<IonInput>) => {
                setTimeout(async () => {
                    await changes.first.setFocus();
                }, 100);
            });
        }
    }

    async onCodeChange(event: Event, index: number): Promise<void> {
        const isEmptyCode = this.codeValues().some((codeValue) => !codeValue.code);
        if (!isEmptyCode) {
            const code = this.codeValues()
                .map((codeValue) => codeValue.code)
                .toString();
            this.#authFacadeService.verifyCode(code);
        } else {
            const value = (event.target as HTMLInputElement).value;
            if (this.codesEl && value) {
                await this.codesEl.get(index + 1)?.setFocus();
            }
        }
    }

    async onModalDismiss(): Promise<void> {
        this.closeVerificationModal();
    }

    continueWithPhoneNumber(): void {
        this.isVerificationOpened.set(true);
        this.#authFacadeService.sendSMS();
    }

    closeVerificationModal(): void {
        const mappedCodeValues = this.codeValues().map((_) => ({ code: null }));
        this.codeValues.set(mappedCodeValues);
        this.isVerificationOpened.set(false);
    }
}
