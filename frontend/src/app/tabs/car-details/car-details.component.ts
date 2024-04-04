import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import {
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { AsyncPipe, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
    calendarOutline,
    peopleOutline,
    barChartOutline,
    timerOutline,
    locationOutline,
    cashOutline,
    carSportOutline,
    settingsOutline,
    analyticsOutline,
} from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarsFacadeService } from '../../store/cars/facades/cars-facade.service';
import { KILOMETERS_TRAVELLED } from '../../constants/kilometers-travelled';
import { CamelToSnakeCasePipe } from '../../pipes/camel-to-snake-case.pipe';
import { MEDIUM_DATE_FORMAT } from '../../constants/medium-date-format';
import { WheelDrivesType } from '../../constants/wheel-drive-types';
import { FourWheelDriveTypes } from '../../constants/four-wheel-drive-type';
import { PremiumBrands } from '../../constants/premium-brands';

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
        IonGrid,
        IonRow,
        IonCol,
        AsyncPipe,
        DatePipe,
        CamelToSnakeCasePipe,
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
    selectedLanguage = toSignal(this._translocoService.langChanges$);

    readonly DATE_FORMAT = MEDIUM_DATE_FORMAT;
    readonly KILOWATTS = 'kW';
    readonly KILOMETERS_TRAVELLED_SHORT = KILOMETERS_TRAVELLED;
    readonly HORSE_POWER_TRANSLATION: { [key: string]: string } = {
        en: 'HP',
        hr: 'KS',
    };
    readonly FUEL_CONSUMPTION_SUFFIX = 'l/100 km';
    readonly WHEEL_DRIVE_TYPES = WheelDrivesType;
    readonly FOUR_WHEEL_DRIVE_TYPES = FourWheelDriveTypes;
    readonly PREMIUM_BRANDS = PremiumBrands;

    @Input()
    set id(carId: number | undefined) {
        if (carId) {
            this._carsFacadeService.getCarDetails(carId);
        }
    }

    constructor() {
        addIcons({
            calendarOutline,
            peopleOutline,
            barChartOutline,
            timerOutline,
            locationOutline,
            cashOutline,
            carSportOutline,
            settingsOutline,
            analyticsOutline,
        });
    }
}
