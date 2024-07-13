import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import { CarsControllerGetCars$Params as CarFilters } from '../../../api/fn/car-list/cars-controller-get-cars';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as CarFiltersActions from '../actions/car-filters.actions';
import * as CarFiltersSelectors from '../selectors/car-filters.selectors';

@Injectable({ providedIn: 'root' })
export class CarFiltersFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.CAR_FILTERS]>);

    private _selectCarBrands = this._store.selectSignal(CarFiltersSelectors.selectCarBrands);

    private _selectCarModels = this._store.selectSignal(CarFiltersSelectors.selectCarModels);

    private _selectCarFiltersResultCount = this._store.selectSignal(
        CarFiltersSelectors.selectCarFiltersResultCount,
    );

    //Selectors BEGIN -------------------------
    selectCarBrands(): Signal<CarBrand[]> {
        return this._selectCarBrands;
    }

    selectCarModels(): Signal<CarModel[]> {
        return this._selectCarModels;
    }

    selectCarFiltersResultCount(): Signal<number | undefined> {
        return this._selectCarFiltersResultCount;
    }
    //Selectors END -------------------------

    //Actions BEGIN -------------------------
    getCarBrands(): void {
        this._store.dispatch(CarFiltersActions.getCarBrands());
    }

    getCarModels(brandId: number): void {
        this._store.dispatch(CarFiltersActions.getCarModels({ brandId }));
    }

    getCarFiltersResultCount(query: CarFilters): void {
        this._store.dispatch(CarFiltersActions.getCarFiltersResultCount({ query }));
    }
    //Actions END -------------------------
}
