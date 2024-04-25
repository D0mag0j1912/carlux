import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import { CarListService } from '../../../api/services/car-list.service';
import * as CarDetailsActions from '../actions/car-details.actions';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { CarDetailsDto as CarDetails } from '../../../api/models/car-details-dto';
import { CarDetailsFacadeService } from '../facades/car-details-facade.service';

export const getCarDetails$ = createEffect(
    (
        actions$ = inject(Actions),
        sharedFacadeService = inject(SharedFacadeService),
        carsService = inject(CarListService),
        carDetailsFacadeService = inject(CarDetailsFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarDetailsActions.getCarDetails),
            tap((_) => carDetailsFacadeService.setCarDetailsLoading(true)),
            switchMap((action) =>
                carsService.recommendedCarsControllerGetCarDetails({ carId: action.carId }).pipe(
                    map((response: CarDetails) =>
                        CarDetailsActions.setCarDetails({ carDetails: response }),
                    ),
                    catchError((_) => {
                        sharedFacadeService.showToastMessage(
                            'recommended_cars.errors.car_details',
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
