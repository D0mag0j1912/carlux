import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent, IonChip } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addCircleOutline, addCircleSharp, locationSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DatePipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { RecommendedCarsDto as RecommendedCars } from '../../api/models/recommended-cars-dto';
import { KILOMETERS_TRAVELLED } from '../../constants/kilometers-travelled';
import { CamelToSnakeCasePipe } from '../../pipes/camel-to-snake-case.pipe';
import { MEDIUM_DATE_FORMAT } from '../../constants/medium-date-format';
import { EmitHandleFavouritesActions } from '../../models/emit-handle-favourites-actions';
import { HandleFavouritesActions } from '../../constants/handle-favourites-actions';

@Component({
    selector: 'car-item',
    standalone: true,
    imports: [IonCard, IonCardContent, IonChip, DatePipe, CamelToSnakeCasePipe, TranslocoModule],
    templateUrl: './car-item.component.html',
    styleUrl: './car-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarItemComponent {
    readonly KILOMETERS = KILOMETERS_TRAVELLED;
    readonly DATE_FORMAT = MEDIUM_DATE_FORMAT;
    readonly HANDLE_FAVOURITES_ACTIONS = HandleFavouritesActions;

    car = input.required<RecommendedCars>();

    emitHandleFavourites = output<EmitHandleFavouritesActions>();

    constructor() {
        addIcons({ locationSharp, addCircleOutline, addCircleSharp });
    }

    handleFavouritesActions(carId: number, method: HandleFavouritesActions): void {
        this.emitHandleFavourites.emit({
            carId,
            method,
        });
    }
}
