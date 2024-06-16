import { Component, OnInit, inject } from '@angular/core';
import {
    IonAccordion,
    IonAccordionGroup,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { CarFiltersFacadeService } from '../../store/car-filters/facades/car-filters-facade.service';
import { FilterAccordionGroups } from './constants/filter-accordion-groups';

const IONIC_IMPORTS = [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    IonBackButton,
];

@Component({
    standalone: true,
    imports: [...IONIC_IMPORTS, TranslocoModule],
    selector: 'car-filters',
    templateUrl: './car-filters.component.html',
    styleUrl: './car-filters.component.scss',
})
export class CarFiltersComponent implements OnInit {
    private _carFiltersFacadeService = inject(CarFiltersFacadeService);

    carBrands = this._carFiltersFacadeService.selectCarBrands();

    readonly filtersAccordionGroups = FilterAccordionGroups;

    ngOnInit(): void {
        this._carFiltersFacadeService.getCarBrands();
    }
}
