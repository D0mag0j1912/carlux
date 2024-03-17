import { Component, Input, inject } from '@angular/core';
import { CarsFacadeService } from '../../store/cars/facades/cars-facade.service';

@Component({
    standalone: true,
    selector: 'car-details',
    templateUrl: './car-details.component.html',
    styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent {
    private _carsFacadeService = inject(CarsFacadeService);

    @Input()
    set id(carId: number | undefined) {
        if (carId) {
            this._carsFacadeService.getCarDetails(carId);
        }
    }
}
