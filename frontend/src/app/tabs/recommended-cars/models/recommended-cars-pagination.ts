import { PaginationDto, RecommendedCarsDto as RecommendedCars } from '../../../api/models';

export type RecommendedCarsPagination = PaginationDto & {
    results?: RecommendedCars[];
};
