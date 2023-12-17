import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { filter, map, take } from 'rxjs';
import { IonInput, IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { PlatformFacadeService } from '../platform/platform-facade/platform-facade.service';
import { environment } from '../../../environments/environment';
import { StatusResponseDto as StatusResponse } from '../../api/models/status-response-dto';
import { AuthenticationFacadeService } from './auth-facade.service';
import { PersonalInformationDialogComponent } from './components/personal-information-dialog/personal-information-dialog.component';

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
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        TranslocoModule,
        PersonalInformationDialogComponent,
    ],
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, AfterViewInit {
    isDesktopMode$ = this._platformFacadeService.selectIsDesktopMode();
    isNotLoading$ = this._authenticationFacadeService
        .selectLoading()
        .pipe(map((isLoading: boolean) => !isLoading));
    smsResponse$ = this._authenticationFacadeService.selectSMSResponse();

    isVerificationModalOpened = signal(false);
    codeValues = signal(INITIAL_CODE_VALUES);
    isVerificationSet = signal(false);
    isVerificationCodeValid = signal(false);

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });

    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    @ViewChildren('codeEl')
    codesEl: QueryList<IonInput> | undefined;

    constructor(
        private _authenticationFacadeService: AuthenticationFacadeService,
        private _platformFacadeService: PlatformFacadeService,
        private _modalController: ModalController,
        private _destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        this._authenticationFacadeService
            .selectVerifyCodeResponse()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe(async (response: StatusResponse) => {
                this.isVerificationSet.set(true);
                const isVerificationValid = response?.status === 201 ? true : false;
                this.isVerificationCodeValid.set(isVerificationValid);
                if (this.isVerificationCodeValid()) {
                    this.isVerificationModalOpened.set(false);
                    const modal = await this._modalController.create({
                        component: PersonalInformationDialogComponent,
                    });
                    await modal.present();
                }
            });
    }

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
                .join('');
            this._authenticationFacadeService.verifyCode(code);
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

    continueWithGoogle(): void {
        const email = environment.signInEmail;
        this._authenticationFacadeService.signIn(email);
    }

    continueWithPhoneNumber(): void {
        this.isVerificationModalOpened.set(true);
        this._authenticationFacadeService.sendSMS();
    }

    closeVerificationModal(): void {
        this._resetForm();
        this.isVerificationModalOpened.set(false);
        this.isVerificationSet.set(false);
    }

    tryAgain(): void {
        this.isVerificationSet.set(false);
        this._resetForm();
        setTimeout(async () => {
            if (this.codesEl?.first) {
                await this.codesEl.first.setFocus();
            }
        }, 100);
    }

    private _resetForm(): void {
        const mappedCodeValues = this.codeValues().map((_) => ({ code: null }));
        this.codeValues.set(mappedCodeValues);
    }
}
