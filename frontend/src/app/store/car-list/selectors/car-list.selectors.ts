import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKeys } from '../../../constants/feature-keys';
import { CarListState } from '../reducers/car-list.reducers';

export const selectCarsState = createFeatureSelector<CarListState>(FeatureKeys.CARS);

export const selectIsCarListNotLoading = createSelector(
    selectCarsState,
    (state: CarListState) => !state.carList.isCarListLoading,
);

export const selectCarList = createSelector(
    selectCarsState,
    (state: CarListState) => state.carList?.carListData?.results ?? [],
);

export const selectHasNoMoreCarListItems = createSelector(
    selectCarsState,
    (state: CarListState) => state.carList.hasNoMoreCarListItems,
);

export const selectHasInfiniteEventCompleted = createSelector(
    selectCarsState,
    (state: CarListState) => state.carList.hasInfiniteEventCompleted,
);
