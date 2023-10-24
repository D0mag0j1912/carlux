import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });
    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef;

    ngAfterViewInit(): void {
        intlTelInput(this.phoneEl.nativeElement, {
            initialCountry: 'hr',
            separateDialCode: true,
            utilsScript: this.UTILS_SCRIPT,
        });
    }
}
