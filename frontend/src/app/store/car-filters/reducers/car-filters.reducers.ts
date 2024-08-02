import { createReducer, on } from '@ngrx/store';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { CAR_FILTERS_INITIAL_STATE } from '../../../tabs/car-filters/constants/car-filters-initial-state';
import { CarFilters } from '../../../tabs/car-filters/models/car-filters.model';
import * as CarFiltersActions from '../actions/car-filters.actions';

export interface CarFiltersState {
    carBrands: CarBrand[];
    carModels: CarModel[];
    resultCount: number | undefined;
    selectedCarFilters: CarFilters;
    areCarBrandsLoaded: boolean;
}

const initialState: CarFiltersState = {
    carBrands: [],
    carModels: [],
    resultCount: undefined,
    selectedCarFilters: CAR_FILTERS_INITIAL_STATE,
    areCarBrandsLoaded: false,
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
        (state: CarFiltersState, { count, selectedCarFiltersQuery }): CarFiltersState => ({
            ...state,
            resultCount: count,
            selectedCarFilters: { ...selectedCarFiltersQuery },
        }),
    ),
    on(
        CarFiltersActions.setAreCarBrandsLoaded,
        (state: CarFiltersState, { areCarBrandsLoaded }) => ({
            ...state,
            areCarBrandsLoaded,
        }),
    ),
);
