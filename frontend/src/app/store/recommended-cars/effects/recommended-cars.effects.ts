import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import { RecommendedCarsListService } from '../../../api/services/recommended-cars-list.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as CarsActions from '../actions/recommended-cars.actions';
import { RecommendedCarsFacadeService } from '../facades/recommended-cars-facade.service';

export const getRecommendedCars$ = createEffect(
    (
        actions$ = inject(Actions),
        sharedFacadeService = inject(SharedFacadeService),
        recommendedCarsService = inject(RecommendedCarsListService),
        carsFacadeService = inject(RecommendedCarsFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarsActions.getRecommendedCars),
            tap((action) => {
                if (action.page === 1) {
                    carsFacadeService.setRecommendedCarsLoading(true);
                } else {
                    carsFacadeService.setHasInfiniteEventCompleted(false);
                }
            }),
            switchMap((action) =>
                recommendedCarsService
                    .recommendedCarsControllerGetRecommendedCars({
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
                        map((recommendedCars) => {
                            if (action.page > 1) {
                                carsFacadeService.setHasInfiniteEventCompleted(true);
                            }
                            return CarsActions.setRecommendedCars({ response: recommendedCars });
                        }),
                        finalize(() => carsFacadeService.setRecommendedCarsLoading(false)),
                    ),
            ),
        ),
    { functional: true },
);
