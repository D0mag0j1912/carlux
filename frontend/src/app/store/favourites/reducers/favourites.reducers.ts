import { createReducer } from '@ngrx/store';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';

export interface FavouritesState {
    areFavouritesLoading: boolean;
    favourites: Favourites[];
}

export const initialFavouritesState: FavouritesState = {
    areFavouritesLoading: false,
    favourites: [],
};

export const reducers = createReducer(initialFavouritesState);
