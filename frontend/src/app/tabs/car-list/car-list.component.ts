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
import { CarFiltersFacadeService } from '../../store/car-filters/facades/car-filters-facade.service';
import { CarListFacadeService } from '../../store/car-list/facades/car-list-facade.service';
import { FavouritesFacadeService } from '../../store/favourites/facades/favourites-facade.service';
import { CarFiltersComponent } from '../car-filters/car-filters.component';
import { CarFilters } from '../car-filters/models/car-filters.model';

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
    selector: 'car-list',
    templateUrl: './car-list.component.html',
    styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
    private _carListFacadeService = inject(CarListFacadeService);
    private _carFiltersFacadeService = inject(CarFiltersFacadeService);
    private _favouritesFacadeService = inject(FavouritesFacadeService);
    private _destroyRef = inject(DestroyRef);
    private _router = inject(Router);

    isCarListNotLoading$ = this._carListFacadeService.selectIsCarListNotLoading();
    carList$ = this._carListFacadeService.selectCarList();
    hasNoMoreCarListItems$ = this._carListFacadeService.selectHasNoMoreCarListItems();

    readonly INFINITE_EVENT_COMPLETE_DURATION = 500;
    readonly DOM_SANITIZER_INPUT_VALUE: DomSanitizerInputType = 'html';
    readonly INITIAL_PAGE = 1;

    page = signal(this.INITIAL_PAGE);
    perPage = signal(DEFAULT_ITEMS_PER_PAGE);

    constructor() {
        addIcons({ searchSharp });
    }

    ngOnInit(): void {
        const query: CarFilters = {
            page: this.page(),
            perPage: this.perPage(),
        };
        this._carListFacadeService.getCarList(query);
    }

    onScrollDown(event: CustomEvent): void {
        this.page.update((page: number) => page + 1);
        const query: CarFilters = {
            ...this._carFiltersFacadeService.selectSelectedCarFilters()(),
            page: this.page(),
        };
        this._carListFacadeService.getCarList(query);

        this._carListFacadeService
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
