import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { PlatformFacadeService } from '../platform/platform-facade/platform-facade.service';
import { takeUntil } from 'rxjs';
import { IonInput } from '@ionic/angular';
import { AuthEventHubService } from './auth-event-hub.service';
import { UnsubscribeService } from '../../services/unsubscribe.service';
import { AuthFacadeService } from './auth-facade.service';

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    providers: [UnsubscribeService],
})
export class AuthComponent implements OnInit, AfterViewInit {
    isDesktopMode$ = this._platformFacadeService.selectIsDesktopMode();
    isVerificationOpened = signal(false);

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });

    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    @ViewChildren('code')
    codesEl: QueryList<IonInput> | undefined;

    constructor(
        private _authEventHubService: AuthEventHubService,
        private _authFacadeService: AuthFacadeService,
        private _platformFacadeService: PlatformFacadeService,
        private _unsubscribeService: UnsubscribeService,
    ) {}

    ngOnInit(): void {
        this._authEventHubService.smsSentSuccessfully$
            .pipe(takeUntil(this._unsubscribeService))
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
    }

    continueWithPhoneNumber(): void {
        this._authFacadeService.sendSMS();
    }

    closeVerificationModal(): void {
        this.isVerificationOpened.set(false);
    }

    async focusFirstElement(): Promise<void> {
        if (this.codesEl) {
            await this.codesEl.first.setFocus();
        }
    }

    async onCodeChange(event: Event, index: number): Promise<void> {
        const value = (event.target as HTMLInputElement).value;
        if (this.codesEl && value) {
            await this.codesEl.get(index + 1)?.setFocus();
        }
    }
}
