import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import { CarFilters } from '../../../tabs/car-filters/models/car-filters.model';
import * as CarFiltersActions from '../actions/car-filters.actions';
import * as CarFiltersSelectors from '../selectors/car-filters.selectors';

@Injectable({ providedIn: 'root' })
export class CarFiltersFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.CAR_FILTERS]>);

    //Selectors BEGIN -------------------------
    selectCarBrands(): Signal<CarBrand[]> {
        return this._store.selectSignal(CarFiltersSelectors.selectCarBrands);
    }

    selectCarModels(): Signal<CarModel[]> {
        return this._store.selectSignal(CarFiltersSelectors.selectCarModels);
    }

    selectCarFiltersResultCount(): Signal<number | undefined> {
        return this._store.selectSignal(CarFiltersSelectors.selectCarFiltersResultCount);
    }

    selectSelectedCarFilters(): Signal<CarFilters> {
        return this._store.selectSignal(CarFiltersSelectors.selectSelectedCarFilters);
    }
    //Selectors END -------------------------

    //Actions BEGIN -------------------------
    getCarBrands(): void {
        this._store.dispatch(CarFiltersActions.getCarBrands());
    }

    getCarModels(brandId: number): void {
        this._store.dispatch(CarFiltersActions.getCarModels({ brandId }));
    }

    getCarFiltersResultCount(selectedCarFiltersQuery: CarFilters): void {
        this._store.dispatch(
            CarFiltersActions.getCarFiltersResultCount({ selectedCarFiltersQuery }),
        );
    }
    //Actions END -------------------------
}
