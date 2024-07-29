import { CarListPagination } from './car-list-pagination';

export interface CarListDataState {
    isCarListLoading: boolean;
    carListData: CarListPagination | undefined;
    hasNoMoreCarListItems: boolean;
    hasInfiniteEventCompleted: boolean;
}
