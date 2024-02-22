import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ITEMS_PER_PAGE } from '../constants/items-per-page';

export class PaginationParamsDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Current page',
    })
    @Type(() => Number)
    page: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Per page',
        default: ITEMS_PER_PAGE,
    })
    @Type(() => Number)
    perPage: number;
}
