import { Component, OnInit, inject } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';
import { FavouritesFacadeService } from '../../store/favourites/facades/favourites-facade.service';
import { FavouriteCarItemComponent } from './favourite-car-item/favourite-car-item.component';

@Component({
    standalone: true,
    imports: [FavouriteCarItemComponent, IonSpinner],
    templateUrl: './favourites.component.html',
    styleUrl: './favourites.component.scss',
})
export class FavouritesComponent implements OnInit {
    private _favouritesFacadeService = inject(FavouritesFacadeService);

    areFavouritesNotLoading = this._favouritesFacadeService.selectAreFavouritesNotLoading();
    favourites = this._favouritesFacadeService.selectFavourites();

    ngOnInit(): void {
        this._favouritesFacadeService.getFavourites();
    }
}
