import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap } from 'rxjs';
import { CarBrandDto as CarBrand } from '../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../api/models/car-model-dto';
import { BasicCarInformationService } from '../../api/services/basic-car-information.service';
import { CarListService } from '../../api/services/car-list.service';
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
}

const initialState: CarFiltersState = {
    carBrands: [],
    carModels: [],
    resultCount: undefined,
    selectedCarFilters: CAR_FILTERS_INITIAL_STATE,
    areCarBrandsLoaded: false,
};

const SET_CAR_BRANDS_ACTION = 'Set Car Brands';
const SET_CAR_MODELS_ACTION = 'Set Car Models';
const SET_CAR_FILTERS_COUNT = 'Set Car Filters Count';

export const CarFiltersStore = signalStore(
    {
        providedIn: 'root',
    },
    withDevtools('carFiltersSignals'),
    withState<CarFiltersState>(initialState),
    withMethods(
        (
            store,
            basicCarInformationService = inject(BasicCarInformationService),
            sharedFacadeService = inject(SharedFacadeService),
            carListService = inject(CarListService),
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
        }),
    ),
);
