import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as FavouritesActions from '../actions/favourites.actions';
import * as FavouritesSelectors from '../selectors/favourites.selectors';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';

@Injectable({ providedIn: 'root' })
export class FavouritesFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.FAVOURITES]>);

    private _selectAreFavouritesNotLoading$ = this._store.select(
        FavouritesSelectors.selectAreNotFavouritesLoading,
    );

    private _selectFavourites$ = this._store.select(FavouritesSelectors.selectFavourites);

    selectAreFavouritesNotLoading(): Observable<boolean> {
        return this._selectAreFavouritesNotLoading$;
    }

    selectFavourites(): Observable<Favourites[]> {
        return this._selectFavourites$;
    }

    getFavourites(): void {
        this._store.dispatch(FavouritesActions.getFavourites());
    }
}
