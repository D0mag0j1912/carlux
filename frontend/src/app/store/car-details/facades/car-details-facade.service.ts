import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { CarDetailsDto as CarDetailsData } from '../../../api/models/car-details-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as CarDetailsActions from '../actions/car-details.actions';
import * as CarDetailsSelectors from '../selectors/car-details.selectors';

@Injectable({ providedIn: 'root' })
export class CarDetailsFacadeService {
    #store = inject(Store<AppState[FeatureKeys.CAR_DETAILS]>);

    //--------------- Selectors BEGIN -------------------------
    selectAreCarDetailsNotLoading(): Observable<boolean> {
        return this.#store.select(CarDetailsSelectors.selectAreCarDetailsNotLoading);
    }

    selectCarDetails(): Observable<CarDetailsData | undefined> {
        return this.#store.select(CarDetailsSelectors.selectCarDetails);
    }
    //--------------- Selectors END ---------------------------

    //--------------- Actions BEGIN ---------------------------
    getCarDetails(carId: number): void {
        this.#store.dispatch(CarDetailsActions.getCarDetails({ carId }));
    }

    setCarDetailsLoading(areCarDetailsLoading: boolean): void {
        this.#store.dispatch(CarDetailsActions.setCarDetailsLoading({ areCarDetailsLoading }));
    }
    //--------------- Actions END ---------------------------
}
