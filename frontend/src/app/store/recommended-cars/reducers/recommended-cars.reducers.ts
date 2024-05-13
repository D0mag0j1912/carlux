import { createReducer, on } from '@ngrx/store';
import { RecommendedCarsDto as RecommendedCar } from '../../../api/models/recommended-cars-dto';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';
import { RecommendedCarsDataState } from '../../../tabs/recommended-cars/models/recommended-cars-state';
import * as FavouritesActions from '../../favourites/actions/favourites.actions';
import * as CarsActions from '../actions/recommended-cars.actions';

export interface RecommendedCarsState {
    recommendedCars: RecommendedCarsDataState;
}

export const initialState: RecommendedCarsState = {
    recommendedCars: {
        areRecommendedCarsLoading: false,
        recommendedCarsData: undefined,
        hasNoMoreRecommendedCars: false,
        hasInfiniteEventCompleted: false,
    },
};

export const reducers = createReducer(
    initialState,
    on(
        CarsActions.setRecommendedCarsLoading,
        (state: RecommendedCarsState, { areRecommendedCarsLoading }) => ({
            ...state,
            recommendedCars: {
                ...state.recommendedCars,
                areRecommendedCarsLoading,
            },
        }),
    ),
    on(CarsActions.setRecommendedCars, (state: RecommendedCarsState, { response }) => {
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
        (state: RecommendedCarsState, { hasInfiniteEventCompleted }) => ({
            ...state,
            recommendedCars: {
                ...state.recommendedCars,
                hasInfiniteEventCompleted,
            },
        }),
    ),
    on(
        FavouritesActions.handleFavouritesActionsSuccess,
        (state: RecommendedCarsState, { carId, method }) => {
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
                                                method ===
                                                HandleFavouritesActions.ADD_TO_FAVOURITES,
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
        },
    ),
);
