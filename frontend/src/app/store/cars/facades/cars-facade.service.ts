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

    private _selectAreRecommendedCarsLoading$ = this._store.select(
        CarsSelectors.selectAreRecommendedCarsNotLoading,
    );

    private _selectRecommendedCars$ = this._store.select(CarsSelectors.selectRecommendedCars);

    //Selectors BEGIN -------------------------
    selectAreRecommendedCarsLoading(): Observable<boolean> {
        return this._selectAreRecommendedCarsLoading$;
    }

    selectRecommendedCars(): Observable<RecommendedCars[]> {
        return this._selectRecommendedCars$;
    }
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
