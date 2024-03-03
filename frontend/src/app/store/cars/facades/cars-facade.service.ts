import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import * as CarsActions from '../actions/cars.actions';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as CarsSelectors from '../selectors/cars.selectors';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';

@Injectable({ providedIn: 'root' })
export class CarsFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.CARS]>);

    private _selectAreRecommendedCarsNotLoading$ = this._store.select(
        CarsSelectors.selectAreRecommendedCarsNotLoading,
    );

    private _selectRecommendedCars$ = this._store.select(CarsSelectors.selectRecommendedCars);

    private _selectHasNoMoreRecommendedCars$ = this._store.select(
        CarsSelectors.selectHasNoMoreRecommendedCars,
    );

    private _selectHasInfiniteEventCompleted$ = this._store.select(
        CarsSelectors.selectHasInfiniteEventCompleted,
    );

    //Selectors BEGIN -------------------------
    selectAreRecommendedCarsNotLoading(): Observable<boolean> {
        return this._selectAreRecommendedCarsNotLoading$;
    }

    selectRecommendedCars(): Observable<RecommendedCars[]> {
        return this._selectRecommendedCars$;
    }

    selectHasNoMoreRecommendedCars(): Observable<boolean> {
        return this._selectHasNoMoreRecommendedCars$;
    }

    selectHasInfiniteEventCompleted(): Observable<boolean> {
        return this._selectHasInfiniteEventCompleted$;
    }
    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    getRecommendedCars(page: number, perPage: number): void {
        this._store.dispatch(CarsActions.getRecommendedCars({ page, perPage }));
    }

    setRecommendedCarsLoading(areRecommendedCarsLoading: boolean): void {
        this._store.dispatch(CarsActions.setRecommendedCarsLoading({ areRecommendedCarsLoading }));
    }

    setHasInfiniteEventCompleted(hasInfiniteEventCompleted: boolean): void {
        this._store.dispatch(
            CarsActions.setHasInfiniteEventCompleted({ hasInfiniteEventCompleted }),
        );
    }
    //Actions END ---------------------------
}
