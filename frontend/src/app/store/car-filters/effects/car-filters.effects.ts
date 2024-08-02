import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { BasicCarInformationService } from '../../../api/services/basic-car-information.service';
import { CarListService } from '../../../api/services/car-list.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as CarFiltersActions from '../actions/car-filters.actions';
import { CarFiltersFacadeService } from '../facades/car-filters-facade.service';

export const getCarBrands$ = createEffect(
    (
        actions$ = inject(Actions),
        basicCarInformationService = inject(BasicCarInformationService),
        sharedFacadeService = inject(SharedFacadeService),
        carFiltersFacadeService = inject(CarFiltersFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarFiltersActions.getCarBrands),
            concatLatestFrom(() => carFiltersFacadeService.selectAreCarBrandsLoaded()),
            tap(([_, areCarBrandsLoaded]) => {
                if (!areCarBrandsLoaded) {
                    carFiltersFacadeService.setAreCarBrandsLoaded(true);
                }
            }),
            switchMap(([_, areCarBrandsLoaded]) => {
                if (!areCarBrandsLoaded) {
                    return basicCarInformationService.basicInfoControllerGetCarBrands().pipe(
                        catchError((_) => {
                            sharedFacadeService.showToastMessage(
                                'filters.errors.get_car_brands',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((carBrands: CarBrand[]) =>
                            CarFiltersActions.setCarBrands({ carBrands }),
                        ),
                    );
                }
                return EMPTY;
            }),
        ),
    { functional: true },
);

export const getCarModels$ = createEffect(
    (
        actions$ = inject(Actions),
        basicCarInformationService = inject(BasicCarInformationService),
        sharedFacadeService = inject(SharedFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarFiltersActions.getCarModels),
            switchMap((action) =>
                basicCarInformationService
                    .basicInfoControllerGetCarModels({ brandId: action.brandId })
                    .pipe(
                        catchError(() => {
                            sharedFacadeService.showToastMessage(
                                'filters.errors.get_car_models',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((carModels: CarModel[]) =>
                            CarFiltersActions.setCarModels({ carModels }),
                        ),
                    ),
            ),
        ),
    { functional: true },
);

export const getCarFiltersResultCount$ = createEffect(
    (
        actions$ = inject(Actions),
        carsService = inject(CarListService),
        sharedFacadeService = inject(SharedFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarFiltersActions.getCarFiltersResultCount),
            switchMap((action) =>
                carsService
                    .carsControllerGetCarsFiltersCount({
                        page: action.selectedCarFiltersQuery.page,
                        perPage: action.selectedCarFiltersQuery.perPage,
                        brandId: action.selectedCarFiltersQuery.brandId,
                        modelIds: action.selectedCarFiltersQuery.modelIds,
                        bodyStyles: action.selectedCarFiltersQuery.bodyStyles,
                        fuelTypes: action.selectedCarFiltersQuery.fuelTypes,
                        yearRegistrationFrom: action.selectedCarFiltersQuery.yearRegistrationFrom,
                        yearRegistrationTo: action.selectedCarFiltersQuery.yearRegistrationTo,
                        priceFrom: action.selectedCarFiltersQuery.priceFrom,
                        priceTo: action.selectedCarFiltersQuery.priceTo,
                        kilometersTravelledFrom:
                            action.selectedCarFiltersQuery.kilometersTravelledFrom,
                        kilometersTravelledTo: action.selectedCarFiltersQuery.kilometersTravelledTo,
                        powerUnit: action.selectedCarFiltersQuery.powerUnit,
                        powerFrom: action.selectedCarFiltersQuery.powerFrom,
                        powerTo: action.selectedCarFiltersQuery.powerTo,
                        transmissionTypes: action.selectedCarFiltersQuery.transmissionTypes,
                    })
                    .pipe(
                        catchError(() => {
                            sharedFacadeService.showToastMessage(
                                'filters.errors.get_car_filters_result_count',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((count: number) =>
                            CarFiltersActions.setCarFiltersResultCount({
                                count,
                                selectedCarFiltersQuery: action.selectedCarFiltersQuery,
                            }),
                        ),
                    ),
            ),
        ),
    { functional: true },
);
