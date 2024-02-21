import { ApiProperty } from '@nestjs/swagger';
import { ITEMS_PER_PAGE } from '../constants/items-per-page';

export class PaginationParamsDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Current page',
    })
    page: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Per page',
        default: ITEMS_PER_PAGE,
    })
    perPage: number;
}
