import { createReducer } from '@ngrx/store';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';

export interface CarsState {
    areRecommendedCarsLoading: boolean;
    recommendedCars: RecommendedCars[];
}

export const initialState: CarsState = {
    areRecommendedCarsLoading: false,
    recommendedCars: [],
};

export const carsReducers = createReducer(initialState);
