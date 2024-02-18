import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import { CarListService } from '../../../api/services/car-list.service';
import * as CarsActions from '../actions/cars.actions';

export const getRecommendedCars$ = createEffect(
    (
        actions$ = inject(Actions),
        sharedFacadeService = inject(SharedFacadeService),
        carsService = inject(CarListService),
    ) => actions$.pipe(ofType(CarsActions.getRecommendedCars)),
    { functional: true },
);
