import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { AsyncPipe, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { calendarOutline, peopleOutline, barChartOutline, timerOutline } from 'ionicons/icons';
import { CarsFacadeService } from '../../store/cars/facades/cars-facade.service';
import { KILOMETERS_TRAVELLED } from '../../constants/kilometers-travelled';

@Component({
    standalone: true,
    imports: [
        TranslocoModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonBackButton,
        IonContent,
        AsyncPipe,
        DatePipe,
    ],
    selector: 'car-details',
    templateUrl: './car-details.component.html',
    styleUrl: './car-details.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarDetailsComponent {
    private _carsFacadeService = inject(CarsFacadeService);
    private _translocoService = inject(TranslocoService);

    areCarDetailsNotLoading$ = this._carsFacadeService.selectAreCarDetailsNotLoading();
    carDetails$ = this._carsFacadeService.selectCarDetails();
    selectedLanguage$ = this._translocoService.langChanges$;

    readonly DATE_FORMAT = 'mediumDate';
    readonly KILOWATTS = 'kW';
    readonly KILOMETERS_TRAVELLED_SHORT = KILOMETERS_TRAVELLED;
    readonly HORSE_POWER_TRANSLATION: { [key: string]: string } = {
        en: 'HP',
        hr: 'KS',
    };

    @Input()
    set id(carId: number | undefined) {
        if (carId) {
            this._carsFacadeService.getCarDetails(carId);
        }
    }

    constructor() {
        addIcons({ calendarOutline, peopleOutline, barChartOutline, timerOutline });
    }
}
