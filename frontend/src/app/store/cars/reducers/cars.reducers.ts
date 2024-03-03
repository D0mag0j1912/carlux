import { createReducer, on } from '@ngrx/store';
import * as CarsActions from '../actions/cars.actions';
import { RecommendedCarsPagination } from '../../../tabs/recommended-cars/models/recommended-cars-pagination';

export interface CarsState {
    areRecommendedCarsLoading: boolean;
    recommendedCars: RecommendedCarsPagination | undefined;
    hasNoMoreRecommendedCars: boolean;
    hasInfiniteEventCompleted: boolean;
}

export const initialState: CarsState = {
    areRecommendedCarsLoading: false,
    recommendedCars: undefined,
    hasNoMoreRecommendedCars: false,
    hasInfiniteEventCompleted: false,
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
    on(CarsActions.setRecommendedCars, (state: CarsState, { response }) => {
        if (state.recommendedCars && state.recommendedCars.results && response.results) {
            return {
                ...state,
                recommendedCars: {
                    ...state.recommendedCars,
                    page: response.page,
                    results: [...state.recommendedCars.results, ...response.results],
                },
                hasNoMoreRecommendedCars: state.recommendedCars.results?.length >= response.count,
            };
        }
        return {
            ...state,
            recommendedCars: { ...response },
        };
    }),
    on(
        CarsActions.setHasInfiniteEventCompleted,
        (state: CarsState, { hasInfiniteEventCompleted }) => ({
            ...state,
            hasInfiniteEventCompleted,
        }),
    ),
);
