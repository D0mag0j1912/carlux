import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { CarModelDto as CarModel } from '../../../api/models/car-model-dto';
import { BasicCarInformationService } from '../../../api/services/basic-car-information.service';
import { CarListService } from '../../../api/services/car-list.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as CarFiltersActions from '../actions/car-filters.actions';

export const getCarBrands$ = createEffect(
    (
        actions$ = inject(Actions),
        basicCarInformationService = inject(BasicCarInformationService),
        sharedFacadeService = inject(SharedFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarFiltersActions.getCarBrands),
            switchMap(() =>
                basicCarInformationService.basicInfoControllerGetCarBrands().pipe(
                    catchError((_) => {
                        sharedFacadeService.showToastMessage(
                            'filters.errors.get_car_brands',
                            POPUP_DURATIONS.ERROR,
                            'warning',
                        );
                        return EMPTY;
                    }),
                    map((carBrands: CarBrand[]) => CarFiltersActions.setCarBrands({ carBrands })),
                ),
            ),
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
                    .carsControllerGetCarsFiltersCount({ carFilterOptions: action.query })
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
                            CarFiltersActions.setCarFiltersResultCount({ count }),
                        ),
                    ),
            ),
        ),
    { functional: true },
);
