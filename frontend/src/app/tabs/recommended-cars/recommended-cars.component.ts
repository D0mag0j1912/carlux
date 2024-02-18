import { Component, OnInit, inject } from '@angular/core';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonSpinner,
} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { CarsFacadeService } from '../../store/cars/facades/cars-facade.service';

@Component({
    standalone: true,
    imports: [
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonSpinner,
        AsyncPipe,
    ],
    selector: 'car-recommended-cars',
    templateUrl: './recommended-cars.component.html',
    styleUrls: ['./recommended-cars.component.scss'],
})
export class RecommendedCarsComponent implements OnInit {
    private _carsFacadeService = inject(CarsFacadeService);

    areRecommendedCarsNotLoading$ = this._carsFacadeService.selectAreRecommendedCarsNotLoading();
    recommendedCars$ = this._carsFacadeService.selectRecommendedCars();

    ngOnInit(): void {
        this._carsFacadeService.getRecommendedCars();
    }
}
