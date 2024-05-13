import { RecommendedCarsPagination } from './recommended-cars-pagination';

export interface RecommendedCarsDataState {
    areRecommendedCarsLoading: boolean;
    recommendedCarsData: RecommendedCarsPagination | undefined;
    hasNoMoreRecommendedCars: boolean;
    hasInfiniteEventCompleted: boolean;
}
