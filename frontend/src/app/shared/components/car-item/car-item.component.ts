import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';

@Component({
    selector: 'car-item',
    standalone: true,
    imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
    templateUrl: './car-item.component.html',
    styleUrl: './car-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarItemComponent {
    @Input()
    car: RecommendedCars | undefined;
}
