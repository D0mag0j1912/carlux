import { createAction, props } from '@ngrx/store';
import { CarFilters } from '../../../tabs/car-filters/models/car-filters.model';
import { CarListPagination } from '../../../tabs/car-list/models/car-list-pagination';

export const setCarListLoading = createAction(
    '[Cars] Set Car List Loading',
    props<{ isCarListLoading: boolean }>(),
);

export const getCarList = createAction('[Cars] Get Car List', props<{ query: CarFilters }>());

export const setCarList = createAction(
    '[Cars] Set Car List',
    props<{
        response: CarListPagination;
    }>(),
);

export const setHasInfiniteEventCompleted = createAction(
    '[Cars] Set Has Infinite Event Completed',
    props<{ hasInfiniteEventCompleted: boolean }>(),
);
