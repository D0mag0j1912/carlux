import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import { CarListService } from '../../../api/services/car-list.service';
import * as CarsActions from '../actions/cars.actions';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { CarsFacadeService } from '../facades/cars-facade.service';

export const getRecommendedCars$ = createEffect(
    (
        actions$ = inject(Actions),
        sharedFacadeService = inject(SharedFacadeService),
        carsService = inject(CarListService),
        carsFacadeService = inject(CarsFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarsActions.getRecommendedCars),
            tap(() => carsFacadeService.setRecommendedCarsLoading(true)),
            switchMap((action) =>
                carsService
                    .carsControllerGetRecommendedCars({
                        page: action.page,
                        perPage: action.perPage,
                    })
                    .pipe(
                        catchError((_) => {
                            sharedFacadeService.showToastMessage(
                                'recommended_cars.errors.get_recommended_cars',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((recommendedCars) =>
                            CarsActions.setRecommendedCars({ recommendedCars }),
                        ),
                        finalize(() => carsFacadeService.setRecommendedCarsLoading(false)),
                    ),
            ),
        ),
    { functional: true },
);
