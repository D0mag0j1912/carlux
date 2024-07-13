import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';
import * as FavouritesActions from '../actions/favourites.actions';
import * as FavouritesSelectors from '../selectors/favourites.selectors';

@Injectable({ providedIn: 'root' })
export class FavouritesFacadeService {
    #store = inject(Store<AppState[FeatureKeys.FAVOURITES]>);

    //------------- Selectors BEGIN ------------------------
    selectAreFavouritesNotLoading(): Signal<boolean> {
        return this.#store.selectSignal(FavouritesSelectors.selectAreFavouritesNotLoading);
    }

    selectFavourites(): Signal<Favourites[]> {
        return this.#store.selectSignal(FavouritesSelectors.selectFavourites);
    }
    //------------- Selectors END -------------------------

    //------------- Actions BEGIN ------------------------
    setLoading(areFavouritesLoading: boolean): void {
        this.#store.dispatch(FavouritesActions.setLoading({ areFavouritesLoading }));
    }

    getFavourites(): void {
        this.#store.dispatch(FavouritesActions.getFavourites());
    }

    handleFavouritesActions(carId: number, method: HandleFavouritesActions): void {
        this.#store.dispatch(FavouritesActions.handleFavouritesActions({ carId, method }));
    }
    //------------- Actions END -------------------------
}
