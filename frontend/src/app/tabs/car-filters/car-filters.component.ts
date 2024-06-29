import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { CarBrandDto as CarBrand } from '../../api/models/car-brand-dto';
import { SearchableSelectComponent } from '../../components/searchable-select/searchable-select.component';
import { CarFiltersFacadeService } from '../../store/car-filters/facades/car-filters-facade.service';
import { CarFilterAccordionGroups } from './constants/car-filter-accordion-groups';

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
    imports: [...IONIC_IMPORTS, TranslocoModule, SearchableSelectComponent, ReactiveFormsModule],
    selector: 'car-filters',
    templateUrl: './car-filters.component.html',
    styleUrl: './car-filters.component.scss',
})
export class CarFiltersComponent implements OnInit {
    private _carFiltersFacadeService = inject(CarFiltersFacadeService);
    private _destroyRef = inject(DestroyRef);

    carBrands = this._carFiltersFacadeService.selectCarBrands();

    readonly filtersAccordionGroups = CarFilterAccordionGroups;

    form = new FormGroup({
        brands: new FormControl<CarBrand[]>([]),
    });

    ngOnInit(): void {
        this._carFiltersFacadeService.getCarBrands();

        this.form.controls.brands.valueChanges
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((carBrands: CarBrand[] | null) => {
                if (carBrands) {
                    const brandId = carBrands[0].id;
                    this._carFiltersFacadeService.getCarModels(brandId);
                }
            });
    }
}
