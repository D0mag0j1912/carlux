import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';
import { BasicCarInformationService } from '../../../api/services/basic-car-information.service';
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
            switchMap((action) =>
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
