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
import { CarsControllerGetCars$Params as CarFilters } from '../../api/fn/car-list/cars-controller-get-cars';
import { CarBrandDto as CarBrand } from '../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../api/models/car-model-dto';
import { SearchableSelectComponent } from '../../components/searchable-select/searchable-select.component';
import { BodyStyles } from '../../models/body-styles';
import { FuelTypes } from '../../models/fuel-types';
import { TransmissionType } from '../../models/transmission-type';
import { CarFiltersFacadeService } from '../../store/car-filters/facades/car-filters-facade.service';
import { CarFilterAccordionGroups } from './constants/car-filter-accordion-groups';
import { CAR_FILTERS_BODY_STYLES } from './constants/car-filters-body-styles';
import { CAR_FILTERS_FUEL_TYPES } from './constants/car-filters-fuel-types';
import { CAR_FILTERS_POWER_UNITS, PowerUnit } from './constants/car-filters-power-metric';
import { CAR_FILTERS_TRANSMISSION_TYPES } from './constants/car-filters-transmission-type';
import { generateKilometers } from './helpers/car-filters-kilometers.helper';
import { generatePrices } from './helpers/car-filters-price.helper';
import { generateCarFiltersRegistrationYears } from './helpers/car-filters-registration-dates.helpers';
import { registrationYearValidator } from './validators/registration-year.validator';

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
    carsFiltersResultsCount = this._carFiltersFacadeService.selectCarFiltersResultCount();

    readonly filtersAccordionGroups = CarFilterAccordionGroups;
    readonly INITIAL_PAGE = 1;
    readonly PER_PAGE = 20;
    readonly ZERO_CAR_RESULTS_COUNT = 0;
    readonly SINGULAR_COUNT_CAR_RESULT = 1;
    readonly CAR_BRAND_VISIBLE_VALUE = 'title';
    readonly CAR_BRAND_HIDDEN_VALUE = 'id';
    readonly CAR_MODELS_VISIBLE_VALUE = 'title';
    readonly CAR_MODELS_HIDDEN_VALUE = 'id';
    readonly euros = '€';
    readonly bodyStyles = CAR_FILTERS_BODY_STYLES;
    readonly fuelTypes = CAR_FILTERS_FUEL_TYPES;
    readonly powerUnits = CAR_FILTERS_POWER_UNITS;
    readonly transmissionTypes = CAR_FILTERS_TRANSMISSION_TYPES;
    readonly registrationYears = generateCarFiltersRegistrationYears();
    readonly prices = generatePrices();
    readonly kilometers = generateKilometers();

    form = new FormGroup({
        brand: new FormControl<CarBrand[]>([], { nonNullable: true }),
        models: new FormControl<CarModel[]>([]),
        bodyStyles: new FormControl<BodyStyles[] | null>(null),
        fuelTypes: new FormControl<FuelTypes[] | null>(null),
        registrationYear: new FormGroup(
            {
                registrationYearFrom: new FormControl<number | null>(null),
                registrationYearTo: new FormControl<number | null>(null),
            },
            { validators: registrationYearValidator() },
        ),
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
            powerFrom: new FormControl<number | null>(null, { updateOn: 'blur' }),
            powerTo: new FormControl<number | null>(null, { updateOn: 'blur' }),
        }),
        transmissionTypes: new FormControl<TransmissionType[] | null>(null),
    });

    ngOnInit(): void {
        this._carFiltersFacadeService.getCarBrands();

        this.form.controls.brand.valueChanges
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((carBrands: CarBrand[] | null) => {
                if (carBrands) {
                    const brandId = carBrands[0].id;
                    this._carFiltersFacadeService.getCarModels(brandId);
                }
            });

        this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
            const query: CarFilters = {
                page: this.INITIAL_PAGE,
                perPage: this.PER_PAGE,
                brandId: (value.brand as CarBrand[])[0]?.id ?? undefined,
                modelIds: value.models?.map((model: CarModel) => model.id) ?? [],
                bodyStyles: value.bodyStyles ?? [],
                fuelTypes: value.fuelTypes ?? [],
                yearRegistrationFrom: value.registrationYear?.registrationYearFrom ?? undefined,
                yearRegistrationTo: value.registrationYear?.registrationYearTo ?? undefined,
                priceFrom: value.price?.priceFrom ?? undefined,
                priceTo: value.price?.priceTo ?? undefined,
                kilometersTravelledFrom: value.kilometers?.kilometersFrom ?? undefined,
                kilometersTravelledTo: value.kilometers?.kilometersTo ?? undefined,
                powerMetric: value.power?.unit ?? undefined,
                powerFrom: value.power?.powerFrom ?? undefined,
                powerTo: value.power?.powerTo ?? undefined,
                transmissionTypes: value.transmissionTypes ?? [],
            };
            this._carFiltersFacadeService.getCarFiltersResultCount(query);
        });
    }
}
