import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platforms } from '@ionic/core';
import * as intlTelInput from 'intl-tel-input';
import { environment } from '../../../environments/environment';
import { PlatformService } from '../../services/platform.service';
import { map } from 'rxjs';

@Component({
    selector: 'yac-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    isDesktop$ = this._platformService.platform$.pipe(
        map((currentPlatforms: Platforms[]) => currentPlatforms.includes('desktop')),
    );

    form = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
    });
    readonly UTILS_SCRIPT = environment.utilsScript;

    @ViewChild('phoneEl')
    phoneEl: ElementRef | undefined;

    constructor(private _platformService: PlatformService) {}

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
