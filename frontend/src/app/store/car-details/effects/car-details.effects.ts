import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import { CarDetailsService } from '../../../api';
import { CarDetailsDto as CarDetails } from '../../../api/models/car-details-dto';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as CarDetailsActions from '../actions/car-details.actions';
import { CarDetailsFacadeService } from '../facades/car-details-facade.service';

export const getCarDetails$ = createEffect(
    (
        actions$ = inject(Actions),
        sharedFacadeService = inject(SharedFacadeService),
        carDetailsService = inject(CarDetailsService),
        carDetailsFacadeService = inject(CarDetailsFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarDetailsActions.getCarDetails),
            tap((_) => carDetailsFacadeService.setCarDetailsLoading(true)),
            switchMap((action) =>
                carDetailsService.carDetailsControllerGetCarDetails({ carId: action.carId }).pipe(
                    map((response: CarDetails) =>
                        CarDetailsActions.setCarDetails({ carDetails: response }),
                    ),
                    catchError((_) => {
                        sharedFacadeService.showToastMessage(
                            'car_list.errors.car_details',
                            POPUP_DURATIONS.ERROR,
                            'warning',
                        );
                        return EMPTY;
                    }),
                    finalize(() => carDetailsFacadeService.setCarDetailsLoading(false)),
                ),
            ),
        ),
    { functional: true },
);
