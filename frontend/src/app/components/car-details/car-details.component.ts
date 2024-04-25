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
import { AsyncPipe, DatePipe, LowerCasePipe } from '@angular/common';
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
    colorPaletteOutline,
} from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';
import { KILOMETERS_TRAVELLED } from '../../constants/kilometers-travelled';
import { CamelToSnakeCasePipe } from '../../pipes/camel-to-snake-case.pipe';
import { MEDIUM_DATE_FORMAT } from '../../constants/medium-date-format';
import { WheelDrivesType } from '../../constants/wheel-drive-types';
import { FourWheelDriveTypes } from '../../constants/four-wheel-drive-type';
import { PremiumBrands } from '../../constants/premium-brands';
import { HORSE_POWER_TRANSLATION } from '../../helpers/horse-power-translation';
import { FUEL_CONSUMPTION_SUFFIX } from '../../helpers/fuel-consumption-suffix';
import { CarDetailsFacadeService } from '../../store/car-details/facades/car-details-facade.service';

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
        LowerCasePipe,
    ],
    selector: 'car-details',
    templateUrl: './car-details.component.html',
    styleUrl: './car-details.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarDetailsComponent {
    private _carsDetailsFacadeService = inject(CarDetailsFacadeService);
    private _translocoService = inject(TranslocoService);

    areCarDetailsNotLoading$ = this._carsDetailsFacadeService.selectAreCarDetailsNotLoading();
    carDetails$ = this._carsDetailsFacadeService.selectCarDetails();
    selectedLanguage = toSignal(this._translocoService.langChanges$);

    readonly DATE_FORMAT = MEDIUM_DATE_FORMAT;
    readonly KILOWATTS = 'kW';
    readonly KILOMETERS_TRAVELLED_SHORT = KILOMETERS_TRAVELLED;
    readonly HORSE_POWER_TRANSLATION = HORSE_POWER_TRANSLATION;
    readonly FUEL_CONSUMPTION_SUFFIX = FUEL_CONSUMPTION_SUFFIX;
    readonly WHEEL_DRIVE_TYPES = WheelDrivesType;
    readonly FOUR_WHEEL_DRIVE_TYPES = FourWheelDriveTypes;
    readonly PREMIUM_BRANDS = PremiumBrands;

    @Input()
    set id(carId: number | undefined) {
        if (carId) {
            this._carsDetailsFacadeService.getCarDetails(carId);
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
            colorPaletteOutline,
        });
    }
}
