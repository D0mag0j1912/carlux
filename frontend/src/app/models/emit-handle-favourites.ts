import { HandleFavourites } from '../constants/handle-favourites';

export interface EmitHandleFavourites {
    carId: number;
    method: HandleFavourites;
}
