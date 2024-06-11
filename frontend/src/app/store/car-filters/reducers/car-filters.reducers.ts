import { createReducer } from '@ngrx/store';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';

export interface CarFiltersState {
    carBrands: CarBrand[];
}

const initialState: CarFiltersState = {
    carBrands: [],
};

export const reducers = createReducer(initialState);
