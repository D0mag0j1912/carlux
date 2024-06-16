import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKeys } from '../../../constants/feature-keys';
import { CarFiltersState } from '../reducers/car-filters.reducers';

export const selectCarFiltersState = createFeatureSelector<CarFiltersState>(
    FeatureKeys.CAR_FILTERS,
);

export const selectCarBrands = createSelector(
    selectCarFiltersState,
    (state: CarFiltersState) => state.carBrands,
);
