import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import * as CarsActions from '../actions/cars.actions';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as CarsSelectors from '../selectors/cars.selectors';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';
import { CarDetailsDto } from '../../../api';

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

    private _selectAreCarDetailsNotLoading$ = this._store.select(
        CarsSelectors.selectAreCarDetailsNotLoading,
    );

    private _selectCarDetails$ = this._store.select(CarsSelectors.selectCarDetails);

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

    selectAreCarDetailsNotLoading(): Observable<boolean> {
        return this._selectAreCarDetailsNotLoading$;
    }

    selectCarDetails(): Observable<CarDetailsDto | undefined> {
        return this._selectCarDetails$;
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

    getCarDetails(carId: number): void {
        this._store.dispatch(CarsActions.getCarDetails({ carId }));
    }

    setCarDetailsLoading(areCarDetailsLoading: boolean): void {
        this._store.dispatch(CarsActions.setCarDetailsLoading({ areCarDetailsLoading }));
    }
    //Actions END ---------------------------
}
