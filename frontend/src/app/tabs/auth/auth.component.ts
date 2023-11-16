import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    inject,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { PlatformFacadeService } from '../platform/platform-facade/platform-facade.service';
import { map } from 'rxjs';
import { IonInput } from '@ionic/angular';
import { AuthFacadeService } from './auth-facade.service';

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

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });
    private _destroyRef = inject(DestroyRef);

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

        if (this.codesEl) {
            this.codesEl.changes
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe((changes: QueryList<IonInput>) => {
                    if (changes?.first) {
                        setTimeout(async () => {
                            await changes.first.setFocus();
                        }, 100);
                    }
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
        if (this.codesEl && value) {
            await this.codesEl.get(index + 1)?.setFocus();
        }
    }
}
