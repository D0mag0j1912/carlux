import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    OnInit,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonInput, IonicModule } from '@ionic/angular';
import { AuthenticationFacadeService } from './auth-facade.service';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthenticationEventEmitterService } from './auth-event-emitter/auth-event-emitter.service';

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
export class AuthComponent implements OnInit, AfterViewInit {
    #authFacadeService = inject(AuthenticationFacadeService);
    #authEventEmitterService = inject(AuthenticationEventEmitterService);
    #platformFacadeService = inject(PlatformFacadeService);
    #destroyRef = inject(DestroyRef);

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

    ngOnInit(): void {
        this.#authEventEmitterService
            .getSmsSent()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe((_) => this.isVerificationOpened.set(true));
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
        this.#authFacadeService.sendSMS();
    }

    closeVerificationModal(): void {
        const mappedCodeValues = this.codeValues().map((_) => ({ code: null }));
        this.codeValues.set(mappedCodeValues);
        this.isVerificationOpened.set(false);
    }
}
