import { RecommendedCarsPagination } from './recommended-cars-pagination';

export interface RecommendedCarsState {
    areRecommendedCarsLoading: boolean;
    recommendedCarsData: RecommendedCarsPagination | undefined;
    hasNoMoreRecommendedCars: boolean;
    hasInfiniteEventCompleted: boolean;
}
