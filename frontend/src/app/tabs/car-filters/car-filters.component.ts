import { KeyValuePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, effect, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    CheckboxChangeEventDetail,
    IonAccordion,
    IonAccordionGroup,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
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
    NavController,
} from '@ionic/angular/standalone';
import { IonCheckboxCustomEvent } from '@ionic/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { filter } from 'rxjs/operators';
import { CarsControllerGetCars$Params as CarFilters } from '../../api/fn/car-list/cars-controller-get-cars';
import { CarBrandDto as CarBrand } from '../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../api/models/car-model-dto';
import { SearchableSelectComponent } from '../../components/searchable-select/searchable-select.component';
import { INITIAL_PAGE, PER_PAGE } from '../../constants/initial-paging-values';
import { BodyStyles } from '../../models/body-styles';
import { FuelTypes } from '../../models/fuel-types';
import { TransmissionType } from '../../models/transmission-type';
import { CarFiltersFacadeService } from '../../store/car-filters/facades/car-filters-facade.service';
import { CarListFacadeService } from '../../store/car-list/facades/car-list-facade.service';
import { CarFilterAccordionGroups } from './constants/car-filters-accordion-groups';
import { CAR_FILTERS_BODY_STYLES } from './constants/car-filters-body-styles';
import { CAR_FILTERS_EQUIPMENT_OPTIONS } from './constants/car-filters-equipment-options';
import { CAR_FILTERS_EXTERIOR_COLORS } from './constants/car-filters-exterior-colors';
import { CAR_FILTERS_FUEL_TYPES } from './constants/car-filters-fuel-types';
import { CAR_FILTERS_POWER_UNITS, PowerUnit } from './constants/car-filters-power-metric';
import { CAR_FILTERS_TRANSMISSION_TYPES } from './constants/car-filters-transmission-type';
import { generateKilometers } from './helpers/car-filters-kilometers.helper';
import { generatePrices } from './helpers/car-filters-price.helper';
import { generateCarFiltersRegistrationYears } from './helpers/car-filters-registration-dates.helpers';
import { carFiltersFormValidator } from './validators/car-filters-form.validator';

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
    IonCheckbox,
];

@Component({
    standalone: true,
    imports: [
        ...IONIC_IMPORTS,
        TranslocoModule,
        SearchableSelectComponent,
        ReactiveFormsModule,
        KeyValuePipe,
    ],
    selector: 'car-filters',
    templateUrl: './car-filters.component.html',
    styleUrl: './car-filters.component.scss',
})
export class CarFiltersComponent implements OnInit {
    private _carFiltersFacadeService = inject(CarFiltersFacadeService);
    private _carListFacadeService = inject(CarListFacadeService);
    private _destroyRef = inject(DestroyRef);
    private _navController = inject(NavController);
    private _translocoService = inject(TranslocoService);

    carBrands = this._carFiltersFacadeService.selectCarBrands();
    carModels = this._carFiltersFacadeService.selectCarModels();
    carsFiltersResultsCount = this._carFiltersFacadeService.selectCarFiltersResultCount();
    equipmentOptions = toSignal(this._translocoService.selectTranslateObject('filters.equipment'));
    selectedEquipmentOptions = signal<number[]>([]);

    readonly INITIAL_POWER_UNIT: PowerUnit = 'PS';
    readonly filtersAccordionGroups = CarFilterAccordionGroups;
    readonly INITIAL_PAGE = INITIAL_PAGE;
    readonly PER_PAGE = PER_PAGE;
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
    readonly CAR_FILTERS_EQUIPMENT_OPTIONS = CAR_FILTERS_EQUIPMENT_OPTIONS;
    readonly CAR_FILTERS_EXTERIOR_COLORS = CAR_FILTERS_EXTERIOR_COLORS;

    basicInformationForm = new FormGroup({
        brand: new FormControl<CarBrand[]>([], { nonNullable: true }),
        models: new FormControl<CarModel[]>([]),
        bodyStyles: new FormControl<BodyStyles[] | null>(null),
        fuelTypes: new FormControl<FuelTypes[] | null>(null),
        registrationYear: new FormGroup(
            {
                registrationYearFrom: new FormControl<number | null>(null),
                registrationYearTo: new FormControl<number | null>(null),
            },
            { validators: carFiltersFormValidator('registrationYear') },
        ),
        price: new FormGroup(
            {
                priceFrom: new FormControl<number | null>(null),
                priceTo: new FormControl<number | null>(null),
            },
            { validators: carFiltersFormValidator('price') },
        ),
        kilometers: new FormGroup(
            {
                kilometersFrom: new FormControl<number | null>(null),
                kilometersTo: new FormControl<number | null>(null),
            },
            { validators: carFiltersFormValidator('kilometersTravelled') },
        ),
        power: new FormGroup(
            {
                unit: new FormControl<PowerUnit>(this.INITIAL_POWER_UNIT, {
                    nonNullable: true,
                }),
                powerFrom: new FormControl<number | null>(null, { updateOn: 'blur' }),
                powerTo: new FormControl<number | null>(null, { updateOn: 'blur' }),
            },
            { validators: carFiltersFormValidator('power') },
        ),
        transmissionTypes: new FormControl<TransmissionType[] | null>(null),
    });

    carFiltersAccordionGroupElement = viewChild('ionAccordionGroupEl', { read: IonAccordionGroup });

    carFiltersAccordionGroupEffect = effect(() => {
        if (this.carFiltersAccordionGroupElement()) {
            const carFiltersAccordionGroupEl =
                this.carFiltersAccordionGroupElement() as IonAccordionGroup;
            carFiltersAccordionGroupEl.value = this.filtersAccordionGroups.BASIC_INFORMATION;
            this._carFiltersFacadeService.getCarBrands();
        }
    });

    ngOnInit(): void {
        this.basicInformationForm.controls.brand.valueChanges
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((carBrands: CarBrand[] | null) => {
                if (carBrands) {
                    const brandId = carBrands[0].id;
                    this._carFiltersFacadeService.getCarModels(brandId);
                    this.basicInformationForm.controls.models.patchValue([], { emitEvent: false });
                }
            });

        this.basicInformationForm.valueChanges
            .pipe(
                filter(() => this.basicInformationForm.valid),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe(() => {
                const query = this._constructCarFilterQuery();
                this._carFiltersFacadeService.getCarFiltersResultCount(query);
            });
    }

    async searchCars(): Promise<void> {
        const query: CarFilters = this._constructCarFilterQuery();
        this._carListFacadeService.getCarList(query);
        await this._navController.navigateForward('tabs/car-list');
    }

    onAccordionChange(event: Event): void {
        const value = ((event as CustomEvent).detail as { value: CarFilterAccordionGroups }).value;
        if (value) {
            if (value === CarFilterAccordionGroups.BASIC_INFORMATION) {
                this._carFiltersFacadeService.getCarBrands();
            } else if (value === CarFilterAccordionGroups.EXTERIOR_COLOR) {
                this._carFiltersFacadeService.getExteriorColors();
            }
        }
    }

    equipmentOptionChanged(
        checkboxEvent: IonCheckboxCustomEvent<CheckboxChangeEventDetail<string>>,
        equipmentId: number,
    ): void {
        const checked = checkboxEvent.detail.checked;
        if (checked) {
            this.selectedEquipmentOptions.update((alreadySelectedEquipmentOptions: number[]) => [
                ...alreadySelectedEquipmentOptions,
                equipmentId,
            ]);
        } else {
            this.selectedEquipmentOptions.update((alreadySelectedEquipmentOptions: number[]) =>
                alreadySelectedEquipmentOptions.filter(
                    (equipmentOption: number) => equipmentOption !== equipmentId,
                ),
            );
        }
        const query = this._constructCarFilterQuery();
        this._carFiltersFacadeService.getCarFiltersResultCount(query);
    }

    private _constructCarFilterQuery(): CarFilters {
        const query: CarFilters = {
            page: this.INITIAL_PAGE,
            perPage: this.PER_PAGE,
            brandId: (this.basicInformationForm.value.brand as CarBrand[])[0]?.id ?? undefined,
            modelIds:
                this.basicInformationForm.value.models?.map((model: CarModel) => model.id) ?? [],
            bodyStyles: this.basicInformationForm.value.bodyStyles ?? [],
            fuelTypes: this.basicInformationForm.value.fuelTypes ?? [],
            yearRegistrationFrom:
                this.basicInformationForm.value.registrationYear?.registrationYearFrom ?? undefined,
            yearRegistrationTo:
                this.basicInformationForm.value.registrationYear?.registrationYearTo ?? undefined,
            priceFrom: this.basicInformationForm.value.price?.priceFrom ?? undefined,
            priceTo: this.basicInformationForm.value.price?.priceTo ?? undefined,
            kilometersTravelledFrom:
                this.basicInformationForm.value.kilometers?.kilometersFrom ?? undefined,
            kilometersTravelledTo:
                this.basicInformationForm.value.kilometers?.kilometersTo ?? undefined,
            powerUnit: this.basicInformationForm.value.power?.unit ?? undefined,
            powerFrom: this.basicInformationForm.value.power?.powerFrom ?? undefined,
            powerTo: this.basicInformationForm.value.power?.powerTo ?? undefined,
            transmissionTypes: this.basicInformationForm.value.transmissionTypes ?? [],
            selectedEquipmentOptions: this.selectedEquipmentOptions(),
        };
        return query;
    }
}
