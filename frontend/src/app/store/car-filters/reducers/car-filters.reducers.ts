import { createReducer, on } from '@ngrx/store';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import * as CarFiltersActions from '../actions/car-filters.actions';

export interface CarFiltersState {
    carBrands: CarBrand[];
}

const initialState: CarFiltersState = {
    carBrands: [],
};

export const reducers = createReducer(
    initialState,
    on(CarFiltersActions.setCarBrands, (state: CarFiltersState, { carBrands }) => ({
        ...state,
        carBrands: { ...carBrands },
    })),
);
