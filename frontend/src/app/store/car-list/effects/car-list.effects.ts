import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, finalize, map, switchMap, tap } from 'rxjs';
import { CarListService } from '../../../api/services/car-list.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as CarsActions from '../actions/car-list.actions';
import { CarListFacadeService } from '../facades/car-list-facade.service';

export const getCarList$ = createEffect(
    (
        actions$ = inject(Actions),
        sharedFacadeService = inject(SharedFacadeService),
        carListService = inject(CarListService),
        carsFacadeService = inject(CarListFacadeService),
    ) =>
        actions$.pipe(
            ofType(CarsActions.getCarList),
            tap((action) => {
                if (action.query.page === 1) {
                    carsFacadeService.setCarListLoading(true);
                } else {
                    carsFacadeService.setHasInfiniteEventCompleted(false);
                }
            }),
            switchMap((action) =>
                carListService
                    .carsControllerGetCars({
                        page: action.query.page,
                        perPage: action.query.perPage,
                        brandId: action.query.brandId,
                        modelIds: action.query.modelIds,
                        bodyStyles: action.query.bodyStyles,
                        fuelTypes: action.query.fuelTypes,
                        yearRegistrationFrom: action.query.yearRegistrationFrom,
                        yearRegistrationTo: action.query.yearRegistrationTo,
                        priceFrom: action.query.priceFrom,
                        priceTo: action.query.priceTo,
                        kilometersTravelledFrom: action.query.kilometersTravelledFrom,
                        kilometersTravelledTo: action.query.kilometersTravelledTo,
                        powerUnit: action.query.powerUnit,
                        powerFrom: action.query.powerFrom,
                        powerTo: action.query.powerTo,
                        transmissionTypes: action.query.transmissionTypes,
                        selectedEquipmentOptions: action.query.selectedEquipmentOptions,
                        selectedExteriorColors: action.query.selectedExteriorColors,
                        selectedInteriorColors: action.query.selectedInteriorColors,
                    })
                    .pipe(
                        catchError((_) => {
                            sharedFacadeService.showToastMessage(
                                'car_list.errors.get_car_list',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((carList) => {
                            if (action.query.page > 1) {
                                carsFacadeService.setHasInfiniteEventCompleted(true);
                            }
                            return CarsActions.setCarList({ response: carList });
                        }),
                        finalize(() => carsFacadeService.setCarListLoading(false)),
                    ),
            ),
        ),
    { functional: true },
);
