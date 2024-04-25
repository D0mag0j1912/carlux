import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarsState } from '../reducers/cars.reducers';
import { FeatureKeys } from '../../../constants/feature-keys';

export const selectCarsState = createFeatureSelector<CarsState>(FeatureKeys.CARS);

export const selectAreRecommendedCarsNotLoading = createSelector(
    selectCarsState,
    (state: CarsState) => !state.recommendedCars.areRecommendedCarsLoading,
);

export const selectRecommendedCars = createSelector(
    selectCarsState,
    (state: CarsState) => state.recommendedCars?.recommendedCarsData?.results ?? [],
);

export const selectHasNoMoreRecommendedCars = createSelector(
    selectCarsState,
    (state: CarsState) => state.recommendedCars.hasNoMoreRecommendedCars,
);

export const selectHasInfiniteEventCompleted = createSelector(
    selectCarsState,
    (state: CarsState) => state.recommendedCars.hasInfiniteEventCompleted,
);
