import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'car-details',
    templateUrl: './car-details.component.html',
    styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent {
    @Input()
    set id(carId: number | undefined) {
        if (carId) {
        }
    }
}
