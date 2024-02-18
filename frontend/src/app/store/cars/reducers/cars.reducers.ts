import { createReducer, on } from '@ngrx/store';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';
import * as CarsActions from '../actions/cars.actions';

export interface CarsState {
    areRecommendedCarsLoading: boolean;
    recommendedCars: RecommendedCars[];
}

export const initialState: CarsState = {
    areRecommendedCarsLoading: false,
    recommendedCars: [],
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
);
