import { createReducer, on } from '@ngrx/store';
import * as CarsActions from '../actions/cars.actions';
import { RecommendedCarsPagination } from '../../../tabs/recommended-cars/models/recommended-cars-pagination';

export interface CarsState {
    areRecommendedCarsLoading: boolean;
    recommendedCars: RecommendedCarsPagination | undefined;
}

export const initialState: CarsState = {
    areRecommendedCarsLoading: false,
    recommendedCars: undefined,
};

export const carsReducers = createReducer(
    initialState,
    on(
        CarsActions.setRecommendedCarsLoading,
        (state: CarsState, { areRecommendedCarsLoading }) => ({
            ...state,
            areRecommendedCarsLoading,
        }),
    ),
    on(CarsActions.setRecommendedCars, (state: CarsState, { recommendedCars }) => ({
        ...state,
        recommendedCars: { ...recommendedCars },
    })),
);
