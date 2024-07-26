import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { CarListDto as CarList } from '../../../api/models/car-list-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import { CarFilters } from '../../../tabs/car-filters/models/car-filters.model';
import * as CarsActions from '../actions/car-list.actions';
import * as CarsSelectors from '../selectors/car-list.selectors';

@Injectable({ providedIn: 'root' })
export class CarListFacadeService {
    #store = inject(Store<AppState[FeatureKeys.CARS]>);

    //--------------- Selectors BEGIN -------------------------
    selectIsCarListNotLoading(): Observable<boolean> {
        return this.#store.select(CarsSelectors.selectIsCarListNotLoading);
    }

    selectCarList(): Observable<CarList[]> {
        return this.#store.select(CarsSelectors.selectCarList);
    }

    selectHasNoMoreCarListItems(): Observable<boolean> {
        return this.#store.select(CarsSelectors.selectHasNoMoreCarListItems);
    }

    selectHasInfiniteEventCompleted(): Observable<boolean> {
        return this.#store.select(CarsSelectors.selectHasInfiniteEventCompleted);
    }
    //--------------- Selectors END ---------------------------

    //--------------- Actions BEGIN ---------------------------
    getCarList(query: CarFilters): void {
        this.#store.dispatch(CarsActions.getCarList({ query }));
    }

    setCarListLoading(isCarListLoading: boolean): void {
        this.#store.dispatch(CarsActions.setCarListLoading({ isCarListLoading }));
    }

    setHasInfiniteEventCompleted(hasInfiniteEventCompleted: boolean): void {
        this.#store.dispatch(
            CarsActions.setHasInfiniteEventCompleted({ hasInfiniteEventCompleted }),
        );
    }
    //--------------- Actions END ---------------------------
}
