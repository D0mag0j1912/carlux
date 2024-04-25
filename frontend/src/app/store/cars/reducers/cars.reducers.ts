import { createReducer, on } from '@ngrx/store';
import * as CarsActions from '../actions/cars.actions';
import { RecommendedCarsState } from '../../../tabs/recommended-cars/models/recommended-cars-state';
import { RecommendedCarsDto as RecommendedCar } from '../../../api/models/recommended-cars-dto';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';
import * as FavouritesActions from '../../favourites/actions/favourites.actions';

export interface CarsState {
    recommendedCars: RecommendedCarsState;
}

export const initialState: CarsState = {
    recommendedCars: {
        areRecommendedCarsLoading: false,
        recommendedCarsData: undefined,
        hasNoMoreRecommendedCars: false,
        hasInfiniteEventCompleted: false,
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
    on(FavouritesActions.handleFavouritesActionsSuccess, (state: CarsState, { carId, method }) => {
        if (state.recommendedCars.recommendedCarsData?.results) {
            return {
                ...state,
                recommendedCars: {
                    ...state.recommendedCars,
                    recommendedCarsData: {
                        ...state.recommendedCars.recommendedCarsData,
                        results: [...state.recommendedCars.recommendedCarsData.results].map(
                            (recommendedCar: RecommendedCar) => {
                                if (recommendedCar.id === carId) {
                                    return {
                                        ...recommendedCar,
                                        isFavourite:
                                            method === HandleFavouritesActions.ADD_TO_FAVOURITES,
                                    };
                                }
                                return { ...recommendedCar };
                            },
                        ),
                    },
                },
            };
        }
        return { ...state };
    }),
);
