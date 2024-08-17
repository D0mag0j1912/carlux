import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap } from 'rxjs';
import { BasicCarInformationService } from '../../../api';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { CAR_FILTERS_INITIAL_STATE } from '../../../tabs/car-filters/constants/car-filters-initial-state';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import { CarFiltersState } from '../reducers/car-filters.reducers';

const INITIAL_STATE: CarFiltersState = {
    carBrands: new Array<CarBrand>(),
    carModels: new Array<CarModel>(),
    resultCount: undefined,
    selectedCarFilters: CAR_FILTERS_INITIAL_STATE,
    areCarBrandsLoaded: false,
};

const SET_CAR_BRANDS_ACTION = 'Set Car Brands';
const SET_CAR_MODELS_ACTION = 'Set Car Models';

export const CarFiltersStore = signalStore(
    {
        providedIn: 'root',
    },
    withDevtools('carFiltersSignals'),
    withState<CarFiltersState>(INITIAL_STATE),
    withMethods(
        (
            store,
            basicCarInformationService = inject(BasicCarInformationService),
            sharedFacadeService = inject(SharedFacadeService),
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
        }),
    ),
);
