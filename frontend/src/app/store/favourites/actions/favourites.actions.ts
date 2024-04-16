import { createAction, props } from '@ngrx/store';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';

export const setLoading = createAction(
    '[Favourites] Set Loading',
    props<{ areFavouritesLoading: boolean }>(),
);

export const getFavourites = createAction('[Favourites] Get Favourites');

export const setFavourites = createAction(
    '[Favourites] Set Favourites',
    props<{ favourites: Favourites[] }>(),
);
