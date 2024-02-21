import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto<T> {
    @ApiProperty({
        type: Number,
        title: 'Current page',
    })
    @IsNumber()
    Page: number;

    @ApiProperty({
        type: Number,
        title: 'Per page',
    })
    @IsNumber()
    PerPage: number;

    @ApiProperty({
        type: Number,
        title: 'Total count of results',
    })
    @IsNumber()
    Count: number;

    Results: T;
}
