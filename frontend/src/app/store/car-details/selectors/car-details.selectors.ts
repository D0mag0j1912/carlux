import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarDetailsState } from '../reducers/car-details.reducers';
import { FeatureKeys } from '../../../constants/feature-keys';

export const selectCarDetailsState = createFeatureSelector<CarDetailsState>(
    FeatureKeys.CAR_DETAILS,
);

export const selectAreCarDetailsNotLoading = createSelector(
    selectCarDetailsState,
    (state: CarDetailsState) => !state.carDetails.areCarDetailsLoading,
);

export const selectCarDetails = createSelector(
    selectCarDetailsState,
    (state: CarDetailsState) => state.carDetails.carDetailsData,
);
