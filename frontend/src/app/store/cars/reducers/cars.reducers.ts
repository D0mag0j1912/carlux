import { createReducer, on } from '@ngrx/store';
import * as CarsActions from '../actions/cars.actions';
import { RecommendedCarsState } from '../../../tabs/recommended-cars/models/recommended-cars-state';
import { CarDetailsState } from '../../../tabs/car-details/models/car-details-state';

export interface CarsState {
    recommendedCars: RecommendedCarsState;
    carDetails: CarDetailsState;
}

export const initialState: CarsState = {
    recommendedCars: {
        areRecommendedCarsLoading: false,
        recommendedCarsData: undefined,
        hasNoMoreRecommendedCars: false,
        hasInfiniteEventCompleted: false,
    },
    carDetails: {
        areCarDetailsLoading: false,
        carDetailsData: undefined,
    },
};

export const carsReducers = createReducer(
    initialState,
    on(
        CarsActions.setRecommendedCarsLoading,
        (state: CarsState, { areRecommendedCarsLoading }) => ({
            ...state,
            recommendedCars: {
                ...state.recommendedCars,
                areRecommendedCarsLoading,
            },
        }),
    ),
    on(CarsActions.setRecommendedCars, (state: CarsState, { response }) => {
        if (
            state.recommendedCars &&
            state.recommendedCars?.recommendedCarsData?.results &&
            response.results
        ) {
            return {
                ...state,
                recommendedCars: {
                    ...state.recommendedCars,
                    recommendedCarsData: {
                        ...state.recommendedCars.recommendedCarsData,
                        page: response.page,
                        results: [
                            ...state.recommendedCars.recommendedCarsData.results,
                            ...response.results,
                        ],
                    },
                    hasNoMoreRecommendedCars:
                        [...state.recommendedCars.recommendedCarsData.results, ...response.results]
                            .length >= response.count,
                },
            };
        }
        return {
            ...state,
            recommendedCars: {
                ...state.recommendedCars,
                recommendedCarsData: { ...response },
            },
        };
    }),
    on(
        CarsActions.setHasInfiniteEventCompleted,
        (state: CarsState, { hasInfiniteEventCompleted }) => ({
            ...state,
            recommendedCars: {
                ...state.recommendedCars,
                hasInfiniteEventCompleted,
            },
        }),
    ),
    on(CarsActions.setCarDetails, (state: CarsState, { carDetails }) => ({
        ...state,
        carDetails: {
            ...state.carDetails,
            carDetailsData: { ...carDetails },
        },
    })),
);
