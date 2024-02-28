import { Component, OnInit, inject, signal } from '@angular/core';
import { IonButton, IonContent, IonIcon, IonSpinner, IonText } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { searchSharp } from 'ionicons/icons';
import { CarsFacadeService } from '../../store/cars/facades/cars-facade.service';
import { CarItemComponent } from '../../shared/components/car-item/car-item.component';
import { DEFAULT_ITEMS_PER_PAGE } from '../../constants/items-per-page';

@Component({
    standalone: true,
    imports: [
        IonContent,
        IonSpinner,
        IonButton,
        IonIcon,
        IonText,
        AsyncPipe,
        TranslocoModule,
        CarItemComponent,
    ],
    selector: 'car-recommended-cars',
    templateUrl: './recommended-cars.component.html',
    styleUrl: './recommended-cars.component.scss',
})
export class RecommendedCarsComponent implements OnInit {
    private _carsFacadeService = inject(CarsFacadeService);

    areRecommendedCarsNotLoading$ = this._carsFacadeService.selectAreRecommendedCarsNotLoading();
    recommendedCars$ = this._carsFacadeService.selectRecommendedCars();

    page = signal(1);
    perPage = signal(DEFAULT_ITEMS_PER_PAGE);

    constructor() {
        addIcons({ searchSharp });
    }

    ngOnInit(): void {
        this._carsFacadeService.getRecommendedCars(this.page(), this.perPage());
    }
}
