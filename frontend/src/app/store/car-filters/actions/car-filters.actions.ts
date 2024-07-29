import { createAction, props } from '@ngrx/store';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { CarFilters } from '../../../tabs/car-filters/models/car-filters.model';

export const getCarBrands = createAction('[Car Filters] Get Car Brands');

export const setCarBrands = createAction(
    '[Car Filters] Set Car Brands',
    props<{ carBrands: CarBrand[] }>(),
);

export const getCarModels = createAction(
    '[Car Filters] Get Car Models',
    props<{ brandId: number }>(),
);

export const setCarModels = createAction(
    '[Car Filters] Set Car Models',
    props<{ carModels: CarModel[] }>(),
);

export const getCarFiltersResultCount = createAction(
    '[Car Filters] Get Car Filters Result Count',
    props<{ selectedCarFiltersQuery: CarFilters }>(),
);

export const setCarFiltersResultCount = createAction(
    '[Car Filters] Set Car Filters Result Count',
    props<{ count: number; selectedCarFiltersQuery: CarFilters }>(),
);
