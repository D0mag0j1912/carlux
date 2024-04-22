import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../..';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as FavouritesActions from '../actions/favourites.actions';
import * as FavouritesSelectors from '../selectors/favourites.selectors';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';

@Injectable({ providedIn: 'root' })
export class FavouritesFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.FAVOURITES]>);

    private _selectAreFavouritesNotLoading = this._store.selectSignal(
        FavouritesSelectors.selectAreFavouritesNotLoading,
    );

    private _selectFavourites = this._store.selectSignal(FavouritesSelectors.selectFavourites);

    //------------- Selectors BEGIN ------------------------
    selectAreFavouritesNotLoading(): Signal<boolean> {
        return this._selectAreFavouritesNotLoading;
    }

    selectFavourites(): Signal<Favourites[]> {
        return this._selectFavourites;
    }
    //------------- Selectors END -------------------------

    //------------- Actions BEGIN ------------------------
    setLoading(areFavouritesLoading: boolean): void {
        this._store.dispatch(FavouritesActions.setLoading({ areFavouritesLoading }));
    }

    getFavourites(): void {
        this._store.dispatch(FavouritesActions.getFavourites());
    }

    handleFavouritesActions(carId: number, method: HandleFavouritesActions): void {
        this._store.dispatch(FavouritesActions.handleFavouritesActions({ carId, method }));
    }
    //------------- Actions END -------------------------
}
