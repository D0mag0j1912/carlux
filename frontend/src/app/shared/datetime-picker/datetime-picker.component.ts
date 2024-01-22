import { Component, Input, ViewChild, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { TranslocoModule } from '@ngneat/transloco';
import { IonContent, IonDatetime, IonButtons, IonButton } from '@ionic/angular/standalone';
import { DialogRoles } from '../../constants/dialog-roles';

@Component({
    standalone: true,
    imports: [TranslocoModule, IonContent, IonDatetime, IonButtons, IonButton],
    templateUrl: './datetime-picker.component.html',
})
export class DateTimePickerComponent {
    private _modalController = inject(ModalController);

    readonly DATE_FORMAT = 'yyyy-MM-dd';

    maxDate = format(new Date(), this.DATE_FORMAT);

    @Input()
    dateValue: string | undefined;

    @ViewChild('datetime', { read: IonDatetime })
    dateTimeEl: IonDatetime | undefined;

    dateChanged(currentDateValue: string | string[] | null | undefined): void {
        if (typeof currentDateValue === 'string') {
            this.dateValue = currentDateValue;
        }
    }

    async close(): Promise<void> {
        await this.dateTimeEl?.cancel();
        await this._modalController.dismiss(undefined, DialogRoles.CANCEL);
    }

    async select(): Promise<void> {
        await this.dateTimeEl?.confirm();
        await this._modalController.dismiss(this.dateValue, DialogRoles.SELECT_DATE);
    }
}
