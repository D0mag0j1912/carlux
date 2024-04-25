import { createAction, props } from '@ngrx/store';
import { CarDetailsDto as CarDetails } from '../../../api/models/car-details-dto';

export const getCarDetails = createAction('[Cars] Get Car Details', props<{ carId: number }>());

export const setCarDetails = createAction(
    '[Cars] Set Car Details',
    props<{ carDetails: CarDetails }>(),
);

export const setCarDetailsLoading = createAction(
    '[Cars] Set Car Details Loading',
    props<{ areCarDetailsLoading: boolean }>(),
);
