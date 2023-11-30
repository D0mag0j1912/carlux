import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { format, parseISO } from 'date-fns';
import { from } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTimePickerComponent } from '../../../../shared/datetime-picker/datetime-picker.component';
import { DialogRoles } from '../../../../constants/dialog-roles';

@Component({
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, TranslocoModule, DateTimePickerComponent],
    templateUrl: './personal-information-dialog.component.html',
    styleUrls: ['./personal-information-dialog.component.scss'],
})
export class PersonalInformationDialogComponent {
    private _modalController = inject(ModalController);
    private _destroyRef = inject(DestroyRef);

    readonly MAX_CHARACTERS = 100;

    form = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        birthDate: new FormControl<string | undefined>('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    async onOpenDatetimePicker(): Promise<void> {
        const modal = await this._modalController.create({
            component: DateTimePickerComponent,
            componentProps: {
                dateValue: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss'Z'`),
            },
            cssClass: 'datetime-picker',
        });

        await modal.present();

        from(modal.onDidDismiss())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((data: OverlayEventDetail<string | undefined>) => {
                if (data.role === DialogRoles.SELECT_DATE && data.data) {
                    const [date, time] = data.data.split('T');
                    const formattedDate = format(
                        parseISO(format(new Date(date), 'yyyy-MM-dd') + `T${time}`),
                        'MMM d, yyyy',
                    );
                    this.form.controls.birthDate.patchValue(formattedDate);
                }
            });
    }

    register(): void {
        if (!this.form.valid) {
            return;
        }
    }
}
