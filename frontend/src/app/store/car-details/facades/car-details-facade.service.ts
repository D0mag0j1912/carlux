import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as CarDetailsSelectors from '../selectors/car-details.selectors';
import { CarDetailsDto as CarDetailsData } from '../../../api/models/car-details-dto';
import * as CarDetailsActions from '../actions/car-details.actions';

@Injectable({ providedIn: 'root' })
export class CarDetailsFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.CAR_DETAILS]>);

    private _selectAreCarDetailsNotLoading$ = this._store.select(
        CarDetailsSelectors.selectAreCarDetailsNotLoading,
    );

    private _selectCarDetails$ = this._store.select(CarDetailsSelectors.selectCarDetails);

    //--------------- Selectors BEGIN -------------------------
    selectAreCarDetailsNotLoading(): Observable<boolean> {
        return this._selectAreCarDetailsNotLoading$;
    }

    selectCarDetails(): Observable<CarDetailsData | undefined> {
        return this._selectCarDetails$;
    }
    //--------------- Selectors END ---------------------------

    //--------------- Actions BEGIN ---------------------------
    getCarDetails(carId: number): void {
        this._store.dispatch(CarDetailsActions.getCarDetails({ carId }));
    }

    setCarDetailsLoading(areCarDetailsLoading: boolean): void {
        this._store.dispatch(CarDetailsActions.setCarDetailsLoading({ areCarDetailsLoading }));
    }
    //--------------- Actions END ---------------------------
}
