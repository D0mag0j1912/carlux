import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap } from 'rxjs';
import { CarBrandDto as CarBrand } from '../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../api/models/car-model-dto';
import { ExteriorColorDto as ExteriorColor } from '../../api/models/exterior-color-dto';
import { InteriorColorsDto as InteriorColor } from '../../api/models/interior-colors-dto';
import { BasicCarInformationService } from '../../api/services/basic-car-information.service';
import { CarListService } from '../../api/services/car-list.service';
import { ExteriorColorsService } from '../../api/services/exterior-colors.service';
import { InteriorColorsService } from '../../api/services/interior-colors.service';
import { FeatureKeys } from '../../constants/feature-keys';
import { POPUP_DURATIONS } from '../../constants/popup-durations';
import { CAR_FILTERS_INITIAL_STATE } from '../../tabs/car-filters/constants/car-filters-initial-state';
import { CarFilters } from '../../tabs/car-filters/models/car-filters.model';
import { SharedFacadeService } from '../shared/facades/shared-facade.service';

export interface CarFiltersState {
    carBrands: CarBrand[];
    carModels: CarModel[];
    resultCount: number | undefined;
    selectedCarFilters: CarFilters;
    areCarBrandsLoaded: boolean;
    exteriorColors: ExteriorColor[];
    areExteriorColorsLoaded: boolean;
    areExteriorColorsLoading: boolean;
    interiorColors: InteriorColor[];
    areInteriorColorsLoaded: boolean;
    areInteriorColorsLoading: boolean;
}

const initialState: CarFiltersState = {
    carBrands: [],
    carModels: [],
    resultCount: undefined,
    selectedCarFilters: CAR_FILTERS_INITIAL_STATE,
    areCarBrandsLoaded: false,
    exteriorColors: [],
    areExteriorColorsLoaded: false,
    areExteriorColorsLoading: false,
    interiorColors: [],
    areInteriorColorsLoaded: false,
    areInteriorColorsLoading: false,
};

const SET_CAR_BRANDS_ACTION = 'Set Car Brands';
const SET_CAR_MODELS_ACTION = 'Set Car Models';
const SET_CAR_FILTERS_COUNT = 'Set Car Filters Count';
const SET_EXTERIOR_COLORS = 'Set Exterior Colors';
const SET_EXTERIOR_COLORS_LOADING = 'Set Exterior Colors Loading';
const SET_INTERIOR_COLORS = 'Set Interior Colors';
const SET_INTERIOR_COLORS_LOADING = 'Set Interior Colors Loading';

export const CarFiltersStore = signalStore(
    {
        providedIn: 'root',
    },
    withDevtools(FeatureKeys.CAR_FILTERS),
    withState<CarFiltersState>(initialState),
    withMethods(
        (
            store,
            basicCarInformationService = inject(BasicCarInformationService),
            sharedFacadeService = inject(SharedFacadeService),
            carListService = inject(CarListService),
            exteriorColorsService = inject(ExteriorColorsService),
            interiorColorsService = inject(InteriorColorsService),
        ) => ({
            getCarBrands: rxMethod<void>(
                pipe(
                    switchMap(() => {
                        const areCarBrandsLoaded = store.areCarBrandsLoaded;
                        if (!areCarBrandsLoaded()) {
                            return basicCarInformationService
                                .basicInfoControllerGetCarBrands()
                                .pipe(
                                    tapResponse({
                                        next: (carBrands: CarBrand[]) => {
                                            updateState(store, SET_CAR_BRANDS_ACTION, {
                                                carBrands: [...carBrands],
                                                areCarBrandsLoaded: true,
                                            });
                                        },
                                        error: () => {
                                            sharedFacadeService.showToastMessage(
                                                'filters.errors.get_car_brands',
                                                POPUP_DURATIONS.ERROR,
                                                'warning',
                                            );
                                        },
                                    }),
                                );
                        }
                        return EMPTY;
                    }),
                ),
            ),
            getCarModels: rxMethod<number>(
                pipe(
                    switchMap((brandId: number) =>
                        basicCarInformationService
                            .basicInfoControllerGetCarModels({ brandId })
                            .pipe(
                                tapResponse({
                                    next: (carModels: CarModel[]) => {
                                        updateState(store, SET_CAR_MODELS_ACTION, {
                                            carModels: [...carModels],
                                        });
                                    },
                                    error: () => {
                                        sharedFacadeService.showToastMessage(
                                            'filters.errors.get_car_models',
                                            POPUP_DURATIONS.ERROR,
                                            'warning',
                                        );
                                    },
                                }),
                            ),
                    ),
                ),
            ),
            getCarFiltersResultCount: rxMethod<CarFilters>(
                pipe(
                    switchMap((selectedCarFiltersQuery: CarFilters) =>
                        carListService
                            .carsControllerGetCarsFiltersCount({
                                page: selectedCarFiltersQuery.page,
                                perPage: selectedCarFiltersQuery.perPage,
                                brandId: selectedCarFiltersQuery.brandId,
                                modelIds: selectedCarFiltersQuery.modelIds,
                                bodyStyles: selectedCarFiltersQuery.bodyStyles,
                                fuelTypes: selectedCarFiltersQuery.fuelTypes,
                                yearRegistrationFrom: selectedCarFiltersQuery.yearRegistrationFrom,
                                yearRegistrationTo: selectedCarFiltersQuery.yearRegistrationTo,
                                priceFrom: selectedCarFiltersQuery.priceFrom,
                                priceTo: selectedCarFiltersQuery.priceTo,
                                kilometersTravelledFrom:
                                    selectedCarFiltersQuery.kilometersTravelledFrom,
                                kilometersTravelledTo:
                                    selectedCarFiltersQuery.kilometersTravelledTo,
                                powerUnit: selectedCarFiltersQuery.powerUnit,
                                powerFrom: selectedCarFiltersQuery.powerFrom,
                                powerTo: selectedCarFiltersQuery.powerTo,
                                transmissionTypes: selectedCarFiltersQuery.transmissionTypes,
                                selectedEquipmentOptions:
                                    selectedCarFiltersQuery.selectedEquipmentOptions,
                                selectedExteriorColors:
                                    selectedCarFiltersQuery.selectedExteriorColors,
                            })
                            .pipe(
                                tapResponse({
                                    next: (count: number) => {
                                        updateState(store, SET_CAR_FILTERS_COUNT, {
                                            resultCount: count,
                                            selectedCarFilters: { ...selectedCarFiltersQuery },
                                        });
                                    },
                                    error: () => {
                                        sharedFacadeService.showToastMessage(
                                            'filters.errors.get_car_filters_result_count',
                                            POPUP_DURATIONS.ERROR,
                                            'warning',
                                        );
                                    },
                                }),
                            ),
                    ),
                ),
            ),
            getExteriorColors: rxMethod<void>(
                pipe(
                    switchMap(() => {
                        updateState(store, SET_EXTERIOR_COLORS_LOADING, {
                            areExteriorColorsLoading: true,
                        });
                        const areExteriorColorsLoaded = store.areExteriorColorsLoaded;
                        if (!areExteriorColorsLoaded()) {
                            return exteriorColorsService
                                .exteriorColorsControllerGetExteriorColors()
                                .pipe(
                                    tapResponse({
                                        next: (exteriorColors: ExteriorColor[]) => {
                                            updateState(store, SET_EXTERIOR_COLORS, {
                                                exteriorColors: [...exteriorColors],
                                                areExteriorColorsLoaded: true,
                                                areExteriorColorsLoading: false,
                                            });
                                        },
                                        error: () => {
                                            sharedFacadeService.showToastMessage(
                                                'filters.errors.get_exterior_colors',
                                                POPUP_DURATIONS.ERROR,
                                                'warning',
                                            );
                                        },
                                    }),
                                );
                        }
                        return EMPTY;
                    }),
                ),
            ),
            getInteriorColors: rxMethod<void>(
                pipe(
                    switchMap(() => {
                        updateState(store, SET_INTERIOR_COLORS_LOADING, {
                            areInteriorColorsLoading: true,
                        });
                        const areInteriorColorsLoaded = store.areInteriorColorsLoaded;
                        if (!areInteriorColorsLoaded()) {
                            return interiorColorsService
                                .interiorColorsControllerGetExteriorColors()
                                .pipe(
                                    tapResponse({
                                        next: (interiorColors: InteriorColor[]) => {
                                            updateState(store, SET_INTERIOR_COLORS, {
                                                interiorColors: [...interiorColors],
                                                areInteriorColorsLoaded: true,
                                                areInteriorColorsLoading: false,
                                            });
                                        },
                                        error: () => {
                                            sharedFacadeService.showToastMessage(
                                                'filters.errors.get_interior_colors',
                                                POPUP_DURATIONS.ERROR,
                                                'warning',
                                            );
                                        },
                                    }),
                                );
                        }
                        return EMPTY;
                    }),
                ),
            ),
        }),
    ),
);
