import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKeys } from '../../../constants/feature-keys';
import { CarDetailsState } from '../reducers/car-details.reducers';

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
