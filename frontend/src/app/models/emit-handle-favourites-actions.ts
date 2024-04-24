import { HandleFavouritesActions } from '../constants/handle-favourites-actions';

export interface EmitHandleFavouritesActions {
    carId: number;
    method: HandleFavouritesActions;
}
