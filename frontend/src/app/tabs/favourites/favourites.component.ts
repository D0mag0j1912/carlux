import { Component, inject } from '@angular/core';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { FavouritesFacadeService } from '../../store/favourites/facades/favourites-facade.service';
import { HandleFavouritesActions } from '../../constants/handle-favourites-actions';
import { FavouriteCarItemComponent } from './favourite-car-item/favourite-car-item.component';

@Component({
    standalone: true,
    imports: [FavouriteCarItemComponent, IonSpinner, IonContent, TranslocoModule],
    templateUrl: './favourites.component.html',
    styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
    private _favouritesFacadeService = inject(FavouritesFacadeService);

    areFavouritesNotLoading = this._favouritesFacadeService.selectAreFavouritesNotLoading();
    favourites = this._favouritesFacadeService.selectFavourites();

    ionViewWillEnter(): void {
        this._favouritesFacadeService.getFavourites();
    }

    removeFromFavourites(data: { carId: number; method: HandleFavouritesActions }): void {
        this._favouritesFacadeService.handleFavouritesActions(data.carId, data.method);
    }
}
