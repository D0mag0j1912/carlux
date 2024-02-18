import { Component, OnInit, inject } from '@angular/core';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonIcon,
    IonSpinner,
} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { searchSharp } from 'ionicons/icons';
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
        IonButton,
        IonIcon,
        AsyncPipe,
        TranslocoModule,
    ],
    selector: 'car-recommended-cars',
    templateUrl: './recommended-cars.component.html',
    styleUrls: ['./recommended-cars.component.scss'],
})
export class RecommendedCarsComponent implements OnInit {
    private _carsFacadeService = inject(CarsFacadeService);

    areRecommendedCarsNotLoading$ = this._carsFacadeService.selectAreRecommendedCarsNotLoading();
    recommendedCars$ = this._carsFacadeService.selectRecommendedCars();

    constructor() {
        addIcons({ searchSharp });
    }

    ngOnInit(): void {
        this._carsFacadeService.getRecommendedCars();
    }
}
