import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
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
import { TranslocoModule } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { searchSharp } from 'ionicons/icons';
import { filter } from 'rxjs';
import { CarItemComponent } from '../../components/car-item/car-item.component';
import { DEFAULT_ITEMS_PER_PAGE } from '../../constants/items-per-page';
import { EmitHandleFavouritesActions } from '../../models/emit-handle-favourites-actions';
import { DomSanitizerInputType, DomSanitizerPipe } from '../../pipes/dom-sanitizer.pipe';
import { FavouritesFacadeService } from '../../store/favourites/facades/favourites-facade.service';
import { RecommendedCarsFacadeService } from '../../store/recommended-cars/facades/recommended-cars-facade.service';
import { CarFiltersComponent } from '../car-filters/car-filters.component';

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
        CarFiltersComponent,
    ],
    selector: 'car-recommended-cars',
    templateUrl: './recommended-cars.component.html',
    styleUrl: './recommended-cars.component.scss',
})
export class RecommendedCarsComponent implements OnInit {
    private _recommendedCarsFacadeService = inject(RecommendedCarsFacadeService);
    private _favouritesFacadeService = inject(FavouritesFacadeService);
    private _destroyRef = inject(DestroyRef);
    private _router = inject(Router);

    areRecommendedCarsNotLoading$ =
        this._recommendedCarsFacadeService.selectAreRecommendedCarsNotLoading();
    recommendedCars$ = this._recommendedCarsFacadeService.selectRecommendedCars();
    hasNoMoreRecommendedCars$ = this._recommendedCarsFacadeService.selectHasNoMoreRecommendedCars();

    page = signal(1);
    perPage = signal(DEFAULT_ITEMS_PER_PAGE);

    readonly INFINITE_EVENT_COMPLETE_DURATION = 500;
    readonly DOM_SANITIZER_INPUT_VALUE: DomSanitizerInputType = 'html';

    constructor() {
        addIcons({ searchSharp });
    }

    ngOnInit(): void {
        this._recommendedCarsFacadeService.getRecommendedCars(this.page(), this.perPage());
    }

    onScrollDown(event: CustomEvent): void {
        this.page.set(this.page() + 1);
        this._recommendedCarsFacadeService.getRecommendedCars(this.page(), this.perPage());
        this._recommendedCarsFacadeService
            .selectHasInfiniteEventCompleted()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((_) => {
                setTimeout(async () => {
                    await (event as InfiniteScrollCustomEvent).target.complete();
                }, this.INFINITE_EVENT_COMPLETE_DURATION);
            });
    }

    handleFavouritesActions(data: EmitHandleFavouritesActions): void {
        this._favouritesFacadeService.handleFavouritesActions(data.carId, data.method);
    }

    async searchCars(): Promise<void> {
        await this._router.navigateByUrl('/tabs/car-filters');
    }
}
