import { createReducer, on } from '@ngrx/store';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import * as CarFiltersActions from '../actions/car-filters.actions';

export interface CarFiltersState {
    carBrands: CarBrand[];
    carModels: CarModel[];
    resultCount: number | undefined;
}

const initialState: CarFiltersState = {
    carBrands: [],
    carModels: [],
    resultCount: undefined,
};

export const reducers = createReducer(
    initialState,
    on(
        CarFiltersActions.setCarBrands,
        (state: CarFiltersState, { carBrands }): CarFiltersState => ({
            ...state,
            carBrands: [...carBrands],
        }),
    ),
    on(
        CarFiltersActions.setCarModels,
        (state: CarFiltersState, { carModels }): CarFiltersState => ({
            ...state,
            carModels: [...carModels],
        }),
    ),
    on(
        CarFiltersActions.setCarFiltersResultCount,
        (state: CarFiltersState, { count }): CarFiltersState => ({
            ...state,
            resultCount: count,
        }),
    ),
);
