import { createReducer } from '@ngrx/store';
import { RecommendedCarsDto as RecommendedCars } from '../../../api/models/recommended-cars-dto';

export interface CarsState {
    recommendedCars: RecommendedCars[];
}

export const initialState: CarsState = {
    recommendedCars: [],
};

export const carsReducers = createReducer(initialState);
