import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto<T> {
    @ApiProperty({
        type: Number,
        title: 'Current page',
    })
    @IsNumber()
    page: number;

    @ApiProperty({
        type: Number,
        title: 'Per page',
    })
    @IsNumber()
    perPage: number;

    @ApiProperty({
        type: Number,
        title: 'Total count of results',
    })
    @IsNumber()
    count: number;

    results: T[];
}
