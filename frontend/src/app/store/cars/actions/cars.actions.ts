import { createAction, props } from '@ngrx/store';
import { RecommendedCarsPagination } from '../../../tabs/recommended-cars/models/recommended-cars-pagination';

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
        recommendedCars: RecommendedCarsPagination;
    }>(),
);
