import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FavoriteListQueryDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car ID',
    })
    @Type(() => Number)
    carId: number;
}
