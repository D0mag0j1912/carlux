import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import {
    InfiniteScrollCustomEvent,
    IonButton,
    IonContent,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSpinner,
    IonText,
} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { searchSharp } from 'ionicons/icons';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { CarsFacadeService } from '../../store/cars/facades/cars-facade.service';
import { CarItemComponent } from '../../components/car-item/car-item.component';
import { DEFAULT_ITEMS_PER_PAGE } from '../../constants/items-per-page';
import { DomSanitizerInputType, DomSanitizerPipe } from '../../pipes/dom-sanitizer.pipe';
import { EmitHandleFavourites } from '../../models/emit-handle-favourites';

@Component({
    standalone: true,
    imports: [
        IonContent,
        IonSpinner,
        IonButton,
        IonIcon,
        IonText,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        AsyncPipe,
        TranslocoModule,
        CarItemComponent,
        RouterModule,
        DomSanitizerPipe,
    ],
    selector: 'car-recommended-cars',
    templateUrl: './recommended-cars.component.html',
    styleUrl: './recommended-cars.component.scss',
})
export class RecommendedCarsComponent implements OnInit {
    private _carsFacadeService = inject(CarsFacadeService);
    private _destroyRef = inject(DestroyRef);

    areRecommendedCarsNotLoading$ = this._carsFacadeService.selectAreRecommendedCarsNotLoading();
    recommendedCars$ = this._carsFacadeService.selectRecommendedCars();
    hasNoMoreRecommendedCars$ = this._carsFacadeService.selectHasNoMoreRecommendedCars();

    page = signal(1);
    perPage = signal(DEFAULT_ITEMS_PER_PAGE);

    readonly INFINITE_EVENT_COMPLETE_DURATION = 500;
    readonly DOM_SANITIZER_INPUT_VALUE: DomSanitizerInputType = 'html';

    constructor() {
        addIcons({ searchSharp });
    }

    ngOnInit(): void {
        this._carsFacadeService.getRecommendedCars(this.page(), this.perPage());
    }

    onScrollDown(event: CustomEvent): void {
        this.page.set(this.page() + 1);
        this._carsFacadeService.getRecommendedCars(this.page(), this.perPage());
        this._carsFacadeService
            .selectHasInfiniteEventCompleted()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((_) => {
                setTimeout(async () => {
                    await (event as InfiniteScrollCustomEvent).target.complete();
                }, this.INFINITE_EVENT_COMPLETE_DURATION);
            });
    }

    handleFavourites(data: EmitHandleFavourites): void {}
}
