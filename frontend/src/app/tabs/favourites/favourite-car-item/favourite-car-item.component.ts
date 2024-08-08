import { DatePipe, LowerCasePipe } from '@angular/common';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonCard, IonCardContent, IonChip, IonIcon } from '@ionic/angular/standalone';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import {
    barChartOutline,
    calendarOutline,
    cogOutline,
    colorFillOutline,
    locationSharp,
    peopleOutline,
    timerOutline,
    trashOutline,
} from 'ionicons/icons';
import { FavouritesDto as Favourite } from '../../../api/models/favourites-dto';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';
import { KILOMETERS_TRAVELLED } from '../../../constants/kilometers-travelled';
import { MEDIUM_DATE_FORMAT } from '../../../constants/medium-date-format';
import { CO2_EMISSIONS_SUFFIX } from '../../../helpers/co2-emissions-suffix';
import { FUEL_CONSUMPTION_SUFFIX } from '../../../helpers/fuel-consumption-suffix';
import { HORSE_POWER_TRANSLATION } from '../../../helpers/horse-power-translation';
import { CamelToSnakeCasePipe } from '../../../pipes/camel-to-snake-case.pipe';

@Component({
    standalone: true,
    imports: [
        IonCard,
        IonCardContent,
        TranslocoModule,
        DatePipe,
        LowerCasePipe,
        IonIcon,
        CamelToSnakeCasePipe,
        IonChip,
    ],
    selector: 'favourite-car-item',
    templateUrl: './favourite-car-item.component.html',
    styleUrl: './favourite-car-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavouriteCarItemComponent {
    private _translocoService = inject(TranslocoService);

    KILOMETERS_TRAVELLED = signal(KILOMETERS_TRAVELLED).asReadonly();
    KILOWATTS = signal('kW').asReadonly();
    HORSE_POWER_TRANSLATION = signal(HORSE_POWER_TRANSLATION).asReadonly();
    FUEL_CONSUMPTION_SUFFIX = signal(FUEL_CONSUMPTION_SUFFIX).asReadonly();
    DATE_FORMAT = signal(MEDIUM_DATE_FORMAT).asReadonly();
    CO2_EMISSIONS_SUFFIX = signal(CO2_EMISSIONS_SUFFIX).asReadonly();

    selectedLanguage = toSignal(this._translocoService.langChanges$, { initialValue: 'en' });

    favouriteCarItem = input.required<Favourite>();

    emitRemoveFromFavourites = output<{ carId: number; method: HandleFavouritesActions }>();

    constructor() {
        addIcons({
            barChartOutline,
            timerOutline,
            peopleOutline,
            calendarOutline,
            cogOutline,
            colorFillOutline,
            locationSharp,
            trashOutline,
        });
    }

    removeFromFavourites(event: Event, carId: number): void {
        event.stopPropagation();
        this.emitRemoveFromFavourites.emit({
            carId,
            method: HandleFavouritesActions.REMOVE_FROM_FAVOURITES,
        });
    }
}
