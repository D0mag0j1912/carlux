import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import * as CarsActions from '../actions/cars.actions';

@Injectable({ providedIn: 'root' })
export class CarsFacadeService {
    private _store = inject(Store<AppState['cars']>);

    //Selectors BEGIN -------------------------

    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    getRecommendedCars(): void {
        this._store.dispatch(CarsActions.getRecommendedCars());
    }
    //Actions END ---------------------------
}
