import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, TranslocoModule],
    templateUrl: './personal-information-dialog.component.html',
    styleUrls: ['./personal-information-dialog.component.scss'],
})
export class PersonalInformationDialogComponent {
    form = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });
}
