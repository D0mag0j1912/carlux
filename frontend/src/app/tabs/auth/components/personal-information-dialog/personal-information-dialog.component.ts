import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { format } from 'date-fns';
import { DateTimePickerComponent } from '../../../../shared/datetime-picker/datetime-picker.component';

@Component({
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, TranslocoModule, DateTimePickerComponent],
    templateUrl: './personal-information-dialog.component.html',
    styleUrls: ['./personal-information-dialog.component.scss'],
})
export class PersonalInformationDialogComponent {
    private _modalController = inject(ModalController);

    readonly MAX_CHARACTERS = 100;

    form = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        birthDate: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    async onOpenDatetimePicker(): Promise<void> {
        await this._modalController.create({
            component: DateTimePickerComponent,
            componentProps: {
                dateValue: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss'Z'`),
            },
            cssClass: 'datetime-picker',
        });
    }

    register(): void {
        if (!this.form.valid) {
            return;
        }
    }
}
