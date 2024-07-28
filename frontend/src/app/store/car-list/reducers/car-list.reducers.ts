import { createReducer, on } from '@ngrx/store';
import { CarListDto as CarList } from '../../../api/models/car-list-dto';
import { HandleFavouritesActions } from '../../../constants/handle-favourites-actions';
import { CarListDataState } from '../../../tabs/car-list/models/car-list-state';
import * as FavouritesActions from '../../favourites/actions/favourites.actions';
import * as CarsActions from '../actions/car-list.actions';

export interface CarListState {
    carList: CarListDataState;
}

const initialState: CarListState = {
    carList: {
        isCarListLoading: false,
        carListData: undefined,
        hasNoMoreCarListItems: false,
        hasInfiniteEventCompleted: false,
    },
};

export const reducers = createReducer(
    initialState,
    on(CarsActions.setCarListLoading, (state: CarListState, { isCarListLoading }) => ({
        ...state,
        carList: {
            ...state.carList,
            isCarListLoading,
        },
    })),
    on(CarsActions.setCarList, (state: CarListState, { response }) => {
        if (state.carList && state.carList?.carListData?.results && response.results) {
            return {
                ...state,
                carList: {
                    ...state.carList,
                    carListData: {
                        ...state.carList.carListData,
                        page: response.page,
                        results:
                            response.page > 1
                                ? [...state.carList.carListData.results, ...response.results]
                                : [...response.results],
                    },
                    hasNoMoreCarListItems:
                        [...state.carList.carListData.results, ...response.results].length >=
                        response.count,
                },
            };
        }
        return {
            ...state,
            carList: {
                ...state.carList,
                carListData: { ...response },
            },
        };
    }),
    on(
        CarsActions.setHasInfiniteEventCompleted,
        (state: CarListState, { hasInfiniteEventCompleted }) => ({
            ...state,
            carList: {
                ...state.carList,
                hasInfiniteEventCompleted,
            },
        }),
    ),
    on(
        FavouritesActions.handleFavouritesActionsSuccess,
        (state: CarListState, { carId, method }) => {
            if (state.carList.carListData?.results) {
                return {
                    ...state,
                    carList: {
                        ...state.carList,
                        carListData: {
                            ...state.carList.carListData,
                            results: [...state.carList.carListData.results].map(
                                (carList: CarList) => {
                                    if (carList.id === carId) {
                                        return {
                                            ...carList,
                                            isFavourite:
                                                method ===
                                                HandleFavouritesActions.ADD_TO_FAVOURITES,
                                        };
                                    }
                                    return { ...carList };
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
