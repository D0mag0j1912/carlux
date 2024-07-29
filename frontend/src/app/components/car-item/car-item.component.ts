import { DatePipe } from '@angular/common';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    ChangeDetectionStrategy,
    Component,
    input,
    output,
} from '@angular/core';
import { IonCard, IonCardContent, IonChip } from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { addCircleOutline, addCircleSharp, locationSharp } from 'ionicons/icons';
import { CarListDto as CarList } from '../../api/models/car-list-dto';
import { HandleFavouritesActions } from '../../constants/handle-favourites-actions';
import { KILOMETERS_TRAVELLED } from '../../constants/kilometers-travelled';
import { MEDIUM_DATE_FORMAT } from '../../constants/medium-date-format';
import { EmitHandleFavouritesActions } from '../../models/emit-handle-favourites-actions';
import { CamelToSnakeCasePipe } from '../../pipes/camel-to-snake-case.pipe';

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

    car = input.required<CarList>();

    emitHandleFavourites = output<EmitHandleFavouritesActions>();

    constructor() {
        addIcons({ locationSharp, addCircleOutline, addCircleSharp });
    }

    handleFavouritesActions(event: Event, carId: number, method: HandleFavouritesActions): void {
        event.stopPropagation();
        this.emitHandleFavourites.emit({
            carId,
            method,
        });
    }
}
