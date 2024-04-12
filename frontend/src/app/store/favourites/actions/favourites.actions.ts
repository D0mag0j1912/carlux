import { createAction, props } from '@ngrx/store';
import { FavouriteListDto as Favourites } from '../../../api/models/favourite-list-dto';

export const getFavourites = createAction('[Favourites] Get Favourites');

export const setFavourites = createAction(
    '[Favourites] Set Favourites',
    props<{ favourites: Favourites[] }>(),
);
