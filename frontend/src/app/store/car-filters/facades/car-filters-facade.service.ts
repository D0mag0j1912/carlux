import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as CarFiltersActions from '../actions/car-filters.actions';
import * as CarFiltersSelectors from '../selectors/car-filters.selectors';

@Injectable({ providedIn: 'root' })
export class CarFiltersFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.CAR_FILTERS]>);

    private _selectCarBrands = this._store.selectSignal(CarFiltersSelectors.selectCarBrands);

    //Selectors BEGIN -------------------------
    selectCarBrands(): Signal<CarBrand[]> {
        return this._selectCarBrands;
    }
    //Selectors END -------------------------

    //Actions BEGIN -------------------------
    getCarBrands(): void {
        this._store.dispatch(CarFiltersActions.getCarBrands());
    }

    getCarModels(brandId: number): void {
        this._store.dispatch(CarFiltersActions.getCarModels({ brandId }));
    }
    //Actions END -------------------------
}
