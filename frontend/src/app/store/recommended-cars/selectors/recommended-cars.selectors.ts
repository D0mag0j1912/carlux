import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKeys } from '../../../constants/feature-keys';
import { RecommendedCarsState } from '../reducers/recommended-cars.reducers';

export const selectCarsState = createFeatureSelector<RecommendedCarsState>(
    FeatureKeys.RECOMMENDED_CARS,
);

export const selectAreRecommendedCarsNotLoading = createSelector(
    selectCarsState,
    (state: RecommendedCarsState) => !state.recommendedCars.areRecommendedCarsLoading,
);

export const selectRecommendedCars = createSelector(
    selectCarsState,
    (state: RecommendedCarsState) => state.recommendedCars?.recommendedCarsData?.results ?? [],
);

export const selectHasNoMoreRecommendedCars = createSelector(
    selectCarsState,
    (state: RecommendedCarsState) => state.recommendedCars.hasNoMoreRecommendedCars,
);

export const selectHasInfiniteEventCompleted = createSelector(
    selectCarsState,
    (state: RecommendedCarsState) => state.recommendedCars.hasInfiniteEventCompleted,
);
