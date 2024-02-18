import { createAction, props } from '@ngrx/store';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';

export const setRecommendedCarsLoading = createAction(
    '[Cars] Set Recommended Cars Loading',
    props<{ areRecommendedCarsLoading: boolean }>(),
);

export const getRecommendedCars = createAction('[Cars] Get Recommended Cars');

export const setRecommendedCars = createAction(
    '[Cars] Set Recommended Cars',
    props<{ recommendedCars: RecommendedCars[] }>(),
);
