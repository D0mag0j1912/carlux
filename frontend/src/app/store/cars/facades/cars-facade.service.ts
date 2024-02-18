import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import * as CarsActions from '../actions/cars.actions';
import { FeatureKeys } from '../../../constants/feature-keys';

@Injectable({ providedIn: 'root' })
export class CarsFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.CARS]>);

    //Selectors BEGIN -------------------------

    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    getRecommendedCars(): void {
        this._store.dispatch(CarsActions.getRecommendedCars());
    }

    setRecommendedCarsLoading(areRecommendedCarsLoading: boolean): void {
        this._store.dispatch(CarsActions.setRecommendedCarsLoading({ areRecommendedCarsLoading }));
    }
    //Actions END ---------------------------
}
