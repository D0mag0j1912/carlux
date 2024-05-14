import { ApiProperty } from '@nestjs/swagger';

export class CarBrandDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car brand ID',
    })
    id: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car code',
    })
    code: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car brand name',
    })
    title: string;
}
