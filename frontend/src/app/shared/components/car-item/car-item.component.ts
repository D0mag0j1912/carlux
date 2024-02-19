import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { locationSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DatePipe } from '@angular/common';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';
import { KILOMETERS_TRAVELLED } from '../../../constants/kilometers-travelled';

@Component({
    selector: 'car-item',
    standalone: true,
    imports: [IonCard, IonCardContent, DatePipe],
    templateUrl: './car-item.component.html',
    styleUrl: './car-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarItemComponent {
    readonly KILOMETERS = KILOMETERS_TRAVELLED;

    @Input({ required: true })
    car: RecommendedCars | undefined;

    constructor() {
        addIcons({ locationSharp });
    }
}
