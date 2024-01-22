import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonRow,
    IonTitle,
    IonToolbar,
    IonItem,
    IonIcon,
    IonLabel,
    IonText,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { from } from 'rxjs';
import { format } from 'date-fns';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';
import { DateTimePickerComponent } from '../../../../shared/datetime-picker/datetime-picker.component';
import { DATETIME_PICKER_INPUT_FORMAT } from '../../../../constants/datetime-picker-input-format';

@Component({
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton,
        IonItem,
        IonIcon,
        IonLabel,
        IonText,
        TranslocoModule,
        FormsModule,
        DateTimePickerComponent,
    ],
    selector: 'car-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
    private _modalController = inject(ModalController);
    private _destroyRef = inject(DestroyRef);

    formattedTodayDate = signal<string>('');

    constructor() {
        addIcons({ calendarOutline });
    }

    async openDateTimePicker(): Promise<void> {
        const modal = await this._modalController.create({
            component: DateTimePickerComponent,
            componentProps: {
                dateValue: format(
                    //TODO: Provide value
                    new Date(),
                    DATETIME_PICKER_INPUT_FORMAT,
                ),
            },
            cssClass: 'datetime-picker',
        });
        await modal.present();

        from(modal.onDidDismiss<string | undefined>())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }
}
