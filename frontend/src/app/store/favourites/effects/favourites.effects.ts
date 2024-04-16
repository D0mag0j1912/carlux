import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as FavouritesActions from '../actions/favourites.actions';
import { FavouritesService } from '../../../api/services/favourites.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { FavouritesDto as Favourites } from '../../../api/models/favourites-dto';

@Injectable()
export class FavouritesEffects {
    private _actions$ = inject(Actions);
    private _sharedFacadeService = inject(SharedFacadeService);
    private _favouritesService = inject(FavouritesService);

    getFavourites$ = createEffect(() =>
        this._actions$.pipe(
            ofType(FavouritesActions.getFavourites),
            switchMap((_) =>
                this._favouritesService.favouritesControllerGetFavouriteList().pipe(
                    catchError((_) => {
                        this._sharedFacadeService.showToastMessage(
                            'favourites.errors.get_favourites',
                            POPUP_DURATIONS.ERROR,
                            'warning',
                        );
                        return EMPTY;
                    }),
                    map((favourites: Favourites[]) =>
                        FavouritesActions.setFavourites({ favourites }),
                    ),
                ),
            ),
        ),
    );
}
