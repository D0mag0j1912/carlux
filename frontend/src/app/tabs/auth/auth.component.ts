import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });

    @ViewChild('phoneEl')
    phoneEl: ElementRef;

    ngAfterViewInit(): void {
        intlTelInput(this.phoneEl.nativeElement, {
            initialCountry: 'hr',
            separateDialCode: true,
            utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
        });
    }
}
