import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKeys } from '../../../constants/feature-keys';
import { FavouritesState } from '../reducers/favourites.reducers';

export const selectFavouritesState = createFeatureSelector<FavouritesState>(FeatureKeys.FAVOURITES);

export const selectAreFavouritesNotLoading = createSelector(
    selectFavouritesState,
    (state: FavouritesState) => !state.areFavouritesLoading,
);

export const selectFavourites = createSelector(
    selectFavouritesState,
    (state: FavouritesState) => state.favourites,
);
