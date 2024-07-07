import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    IonAccordion,
    IonAccordionGroup,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { CarBrandDto as CarBrand } from '../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../api/models/car-model-dto';
import { SearchableSelectComponent } from '../../components/searchable-select/searchable-select.component';
import { BodyStyles } from '../../models/body-styles';
import { FuelTypes } from '../../models/fuel-types';
import { CarFiltersFacadeService } from '../../store/car-filters/facades/car-filters-facade.service';
import { CarFilterAccordionGroups } from './constants/car-filter-accordion-groups';
import { CAR_FILTERS_BODY_STYLES } from './constants/car-filters-body-styles';
import { CAR_FILTERS_FUEL_TYPES } from './constants/car-filters-fuel-types';
import { CAR_FILTERS_POWER_UNITS, PowerUnit } from './constants/car-filters-power-metric';
import { generateKilometers } from './helpers/car-filters-kilometers.helper';
import { generatePrices } from './helpers/car-filters-price.helper';
import { generateCarFiltersRegistrationYears } from './helpers/car-filters-registration-dates.helpers';

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
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
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
    carModels = this._carFiltersFacadeService.selectCarModels();

    readonly filtersAccordionGroups = CarFilterAccordionGroups;
    readonly CAR_BRAND_VISIBLE_VALUE = 'title';
    readonly CAR_BRAND_HIDDEN_VALUE = 'id';
    readonly CAR_MODELS_VISIBLE_VALUE = 'title';
    readonly CAR_MODELS_HIDDEN_VALUE = 'id';
    readonly euros = '€';
    readonly bodyStyles = CAR_FILTERS_BODY_STYLES;
    readonly fuelTypes = CAR_FILTERS_FUEL_TYPES;
    readonly powerUnits = CAR_FILTERS_POWER_UNITS;
    readonly registrationYears = generateCarFiltersRegistrationYears();
    readonly prices = generatePrices();
    readonly kilometers = generateKilometers();

    form = new FormGroup({
        brands: new FormControl<CarBrand[]>([]),
        models: new FormControl<CarModel[]>([]),
        bodyStyle: new FormControl<BodyStyles | null>(null),
        fuelType: new FormControl<FuelTypes | null>(null),
        registrationYear: new FormGroup({
            registrationYearFrom: new FormControl<number | null>(null),
            registrationYearTo: new FormControl<number | null>(null),
        }),
        price: new FormGroup({
            priceFrom: new FormControl<number | null>(null),
            priceTo: new FormControl<number | null>(null),
        }),
        kilometers: new FormGroup({
            kilometersFrom: new FormControl<number | null>(null),
            kilometersTo: new FormControl<number | null>(null),
        }),
        power: new FormGroup({
            unit: new FormControl<PowerUnit | null>(null),
            powerFrom: new FormControl<number | null>(null),
            powerTo: new FormControl<number | null>(null),
        }),
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
