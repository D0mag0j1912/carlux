import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'favourite-car-item',
    templateUrl: './favourite-car-item.component.html',
    styleUrl: './favourite-car-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavouriteCarItemComponent {}
