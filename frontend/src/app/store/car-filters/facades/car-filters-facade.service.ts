import { Injectable, Signal, inject } from '@angular/core';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { CarFilters } from '../../../tabs/car-filters/models/car-filters.model';
import { CarFiltersStore } from '../car-filter-store';

@Injectable({ providedIn: 'root' })
export class CarFiltersFacadeService {
    private _carFiltersStore = inject(CarFiltersStore);

    //Selectors BEGIN -------------------------
    selectCarBrands(): Signal<CarBrand[]> {
        return this._carFiltersStore.carBrands;
    }

    selectCarModels(): Signal<CarModel[]> {
        return this._carFiltersStore.carModels;
    }

    selectCarFiltersResultCount(): Signal<number | undefined> {
        return this._carFiltersStore.resultCount;
    }

    selectSelectedCarFilters(): Signal<CarFilters> {
        return this._carFiltersStore.selectedCarFilters;
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
        this._carFiltersStore.getCarFiltersResultCount(selectedCarFiltersQuery);
    }
    //Actions END -------------------------
}
