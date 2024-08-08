import { AsyncPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
    NavController,
} from '@ionic/angular/standalone';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import {
    analyticsOutline,
    barChartOutline,
    calendarOutline,
    carSportOutline,
    cashOutline,
    colorPaletteOutline,
    locationOutline,
    peopleOutline,
    settingsOutline,
    timerOutline,
} from 'ionicons/icons';
import { FourWheelDriveTypes } from '../../constants/four-wheel-drive-type';
import { KILOMETERS_TRAVELLED } from '../../constants/kilometers-travelled';
import { MEDIUM_DATE_FORMAT } from '../../constants/medium-date-format';
import { PremiumBrands } from '../../constants/premium-brands';
import { WheelDrivesType } from '../../constants/wheel-drive-types';
import { FUEL_CONSUMPTION_SUFFIX } from '../../helpers/fuel-consumption-suffix';
import { HORSE_POWER_TRANSLATION } from '../../helpers/horse-power-translation';
import { CamelToSnakeCasePipe } from '../../pipes/camel-to-snake-case.pipe';
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
    private _navController = inject(NavController);

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

    navigateToPreviousPage(): void {
        this._navController.back();
    }
}
