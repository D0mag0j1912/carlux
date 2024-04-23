import { createAction, props } from '@ngrx/store';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';

export const setLoading = createAction(
    '[Favourites] Set Loading',
    props<{ areFavouritesLoading: boolean }>(),
);

export const getFavourites = createAction('[Favourites] Get Favourites');

export const setFavourites = createAction(
    '[Favourites] Set Favourites',
    props<{ favourites: Favourites[] }>(),
);

export const handleFavouritesActions = createAction(
    '[Favourites] Handle Favourites Actions',
    props<{ carId: number; method: HandleFavouritesActions }>(),
);

export const handleFavouritesActionsSuccess = createAction(
    '[Favourites] Handle Favourites Actions Success',
    props<{ carId: number; method: HandleFavouritesActions }>(),
);
