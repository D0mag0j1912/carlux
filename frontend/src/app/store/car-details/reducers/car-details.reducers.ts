import { createReducer, on } from '@ngrx/store';
import { CarDetails } from '../../../components/car-details/models/car-details';
import * as CarDetailsActions from '../actions/car-details.actions';

export interface CarDetailsState {
    carDetails: CarDetails;
}

export const initialState: CarDetailsState = {
    carDetails: {
        areCarDetailsLoading: false,
        carDetailsData: undefined,
    },
};

export const reducers = createReducer(
    initialState,
    on(CarDetailsActions.setCarDetails, (state: CarDetailsState, { carDetails }) => ({
        ...state,
        carDetails: {
            ...state.carDetails,
            carDetailsData: { ...carDetails },
        },
    })),
    on(
        CarDetailsActions.setCarDetailsLoading,
        (state: CarDetailsState, { areCarDetailsLoading }) => ({
            ...state,
            carDetails: {
                ...state.carDetails,
                areCarDetailsLoading,
            },
        }),
    ),
);
