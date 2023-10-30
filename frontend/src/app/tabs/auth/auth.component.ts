import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, AfterViewInit {
    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });
    readonly UTILS_SCRIPT = environment.utilsScript;

    isDesktop = false;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    constructor(private _platform: Platform) {}

    ngOnInit(): void {
        this.isDesktop = this._platform.is('desktop');
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
}
