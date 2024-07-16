import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as CarsActions from '../actions/recommended-cars.actions';
import * as CarsSelectors from '../selectors/recommended-cars.selectors';

@Injectable({ providedIn: 'root' })
export class RecommendedCarsFacadeService {
    #store = inject(Store<AppState[FeatureKeys.RECOMMENDED_CARS]>);

    //--------------- Selectors BEGIN -------------------------
    selectAreRecommendedCarsNotLoading(): Observable<boolean> {
        return this.#store.select(CarsSelectors.selectAreRecommendedCarsNotLoading);
    }

    selectRecommendedCars(): Observable<RecommendedCars[]> {
        return this.#store.select(CarsSelectors.selectRecommendedCars);
    }

    selectHasNoMoreRecommendedCars(): Observable<boolean> {
        return this.#store.select(CarsSelectors.selectHasNoMoreRecommendedCars);
    }

    selectHasInfiniteEventCompleted(): Observable<boolean> {
        return this.#store.select(CarsSelectors.selectHasInfiniteEventCompleted);
    }
    //--------------- Selectors END ---------------------------

    //--------------- Actions BEGIN ---------------------------
    getRecommendedCars(page: number, perPage: number): void {
        this.#store.dispatch(CarsActions.getRecommendedCars({ page, perPage }));
    }

    setRecommendedCarsLoading(areRecommendedCarsLoading: boolean): void {
        this.#store.dispatch(CarsActions.setRecommendedCarsLoading({ areRecommendedCarsLoading }));
    }

    setHasInfiniteEventCompleted(hasInfiniteEventCompleted: boolean): void {
        this.#store.dispatch(
            CarsActions.setHasInfiniteEventCompleted({ hasInfiniteEventCompleted }),
        );
    }
    //--------------- Actions END ---------------------------
}
