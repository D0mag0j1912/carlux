import { createAction, props } from '@ngrx/store';
import { RecommendedCarsPagination } from '../../../tabs/recommended-cars/models/recommended-cars-pagination';
import { CarDetailsDto as CarDetails } from '../../../api/models/car-details-dto';

export const setRecommendedCarsLoading = createAction(
    '[Cars] Set Recommended Cars Loading',
    props<{ areRecommendedCarsLoading: boolean }>(),
);

export const getRecommendedCars = createAction(
    '[Cars] Get Recommended Cars',
    props<{ page: number; perPage: number }>(),
);

export const setRecommendedCars = createAction(
    '[Cars] Set Recommended Cars',
    props<{
        response: RecommendedCarsPagination;
    }>(),
);

export const setHasInfiniteEventCompleted = createAction(
    '[Cars] Set Has Infinite Event Completed',
    props<{ hasInfiniteEventCompleted: boolean }>(),
);

// ---------- CAR DETAILS -------------
export const getCarDetails = createAction('[Cars] Get Car Details', props<{ carId: number }>());

export const setCarDetails = createAction(
    '[Cars] Set Car Details',
    props<{ carDetails: CarDetails }>(),
);

export const setCarDetailsLoading = createAction(
    '[Cars] Set Car Details Loading',
    props<{ areCarDetailsLoading: boolean }>(),
);
