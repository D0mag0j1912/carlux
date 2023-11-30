import { Component, Input, ViewChild, inject } from '@angular/core';
import { IonDatetime, IonicModule, ModalController } from '@ionic/angular';
import { format, subMonths } from 'date-fns';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogRoles } from '../../constants/dialog-roles';

@Component({
    standalone: true,
    imports: [IonicModule, TranslocoModule],
    templateUrl: './datetime-picker.component.html',
})
export class DateTimePickerComponent {
    private _modalController = inject(ModalController);

    maxDate = format(new Date(), 'yyyy-MM-dd');
    minDate = format(subMonths(new Date(), 2), 'yyyy-MM-dd');

    @Input()
    dateValue: string | undefined;

    @ViewChild('datetime', { read: IonDatetime })
    dateTimeEl: IonDatetime | undefined;

    dateChanged(currentDateValue: string | string[] | null | undefined): void {
        //this.dateValue = currentDateValue;
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
