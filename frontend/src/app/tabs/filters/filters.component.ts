import { Component, inject } from '@angular/core';
import {
    IonAccordion,
    IonAccordionGroup,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogRoles } from '../../constants/dialog-roles';
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
];

@Component({
    standalone: true,
    imports: [...IONIC_IMPORTS, TranslocoModule],
    selector: 'car-filters',
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss',
})
export class FiltersComponent {
    private _modalController = inject(ModalController);

    readonly filtersAccordionGroups = FilterAccordionGroups;

    async closeFiltersModal(): Promise<void> {
        await this._modalController.dismiss(undefined, DialogRoles.CANCEL);
    }
}
