import { Component, inject } from '@angular/core';
import { FavouritesFacadeService } from '../../store/favourites/facades/favourites-facade.service';
import { FavouriteCarItemComponent } from './favourite-car-item/favourite-car-item.component';

@Component({
    standalone: true,
    imports: [FavouriteCarItemComponent],
    templateUrl: './favourites.component.html',
    styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
    private _favouritesFacadeService = inject(FavouritesFacadeService);

    areFavouritesNotLoading = this._favouritesFacadeService.selectAreFavouritesNotLoading();
    favourites = this._favouritesFacadeService.selectFavourites();
}
