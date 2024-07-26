import { CarListDto as CarList, PaginationDto } from '../../../api/models';

export type CarListPagination = PaginationDto & {
    results?: CarList[];
};
