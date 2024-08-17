import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import { CarFilters } from '../../../tabs/car-filters/models/car-filters.model';
import * as CarFiltersActions from '../actions/car-filters.actions';
import * as CarFiltersSelectors from '../selectors/car-filters.selectors';
import { CarFiltersStore } from '../signals/car-filter-store';

@Injectable({ providedIn: 'root' })
export class CarFiltersFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.CAR_FILTERS]>);
    private _carFiltersStore = inject(CarFiltersStore);

    //Selectors BEGIN -------------------------
    selectCarBrands(): Signal<CarBrand[]> {
        return this._carFiltersStore.carBrands;
    }

    selectCarModels(): Signal<CarModel[]> {
        return this._carFiltersStore.carModels;
    }

    selectCarFiltersResultCount(): Signal<number | undefined> {
        return this._store.selectSignal(CarFiltersSelectors.selectCarFiltersResultCount);
    }

    selectSelectedCarFilters(): Signal<CarFilters> {
        return this._store.selectSignal(CarFiltersSelectors.selectSelectedCarFilters);
    }

    selectAreCarBrandsLoaded(): Observable<boolean> {
        return this._store.select(CarFiltersSelectors.selectAreCarBrandsLoaded);
    }
    //Selectors END -------------------------

    //Actions BEGIN -------------------------
    getCarBrands(): void {
        this._carFiltersStore.getCarBrands();
    }

    getCarModels(brandId: number): void {
        this._carFiltersStore.getCarModels(brandId);
    }

    getCarFiltersResultCount(selectedCarFiltersQuery: CarFilters): void {
        this._store.dispatch(
            CarFiltersActions.getCarFiltersResultCount({ selectedCarFiltersQuery }),
        );
    }

    setAreCarBrandsLoaded(areCarBrandsLoaded: boolean): void {
        this._store.dispatch(CarFiltersActions.setAreCarBrandsLoaded({ areCarBrandsLoaded }));
    }
    //Actions END -------------------------
}
