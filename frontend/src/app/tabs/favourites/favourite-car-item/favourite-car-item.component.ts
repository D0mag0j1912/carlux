import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FavouritesDto as Favourite } from '../../../api/models/favourites-dto';

@Component({
    standalone: true,
    selector: 'favourite-car-item',
    templateUrl: './favourite-car-item.component.html',
    styleUrl: './favourite-car-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavouriteCarItemComponent {
    favouriteCarItem = input.required<Favourite>();
}
