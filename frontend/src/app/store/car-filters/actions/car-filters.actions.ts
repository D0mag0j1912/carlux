import { createAction, props } from '@ngrx/store';
import { CarsControllerGetCars$Params as CarFilters } from '../../../api/fn/car-list/cars-controller-get-cars';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';

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
    props<{ query: CarFilters }>(),
);

export const setCarFiltersResultCount = createAction(
    '[Car Filters] Set Car Filters Result Count',
    props<{ count: number }>(),
);
