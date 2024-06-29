import { createReducer, on } from '@ngrx/store';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import * as CarFiltersActions from '../actions/car-filters.actions';

export interface CarFiltersState {
    carBrands: CarBrand[];
    carModels: CarModel[];
}

const initialState: CarFiltersState = {
    carBrands: [],
    carModels: [],
};

export const reducers = createReducer(
    initialState,
    on(CarFiltersActions.setCarBrands, (state: CarFiltersState, { carBrands }) => ({
        ...state,
        carBrands: [...carBrands],
    })),
    on(CarFiltersActions.setCarModels, (state: CarFiltersState, { carModels }) => ({
        ...state,
        carModels: [...carModels],
    })),
);
