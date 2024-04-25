import { createReducer, on } from '@ngrx/store';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';
import * as FavouritesActions from '../actions/favourites.actions';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';

export interface FavouritesState {
    areFavouritesLoading: boolean;
    favourites: Favourites[];
}

export const initialFavouritesState: FavouritesState = {
    areFavouritesLoading: false,
    favourites: [],
};

export const reducers = createReducer(
    initialFavouritesState,
    on(FavouritesActions.setLoading, (state: FavouritesState, { areFavouritesLoading }) => ({
        ...state,
        areFavouritesLoading,
    })),
    on(FavouritesActions.setFavourites, (state: FavouritesState, { favourites }) => ({
        ...state,
        favourites: [...favourites],
    })),
    on(
        FavouritesActions.handleFavouritesActionsSuccess,
        (state: FavouritesState, { carId, method }) => {
            if (method === HandleFavouritesActions.REMOVE_FROM_FAVOURITES) {
                return {
                    ...state,
                    favourites: [...state.favourites].filter(
                        (favourite: Favourites) => favourite.id !== carId,
                    ),
                };
            }
            return { ...state };
        },
    ),
);
