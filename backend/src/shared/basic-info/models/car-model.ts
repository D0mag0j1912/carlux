import { ApiProperty } from '@nestjs/swagger';

export class CarModelDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car model ID',
    })
    id: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car brand ID',
    })
    brandId: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car code',
    })
    code: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car model name',
    })
    title: string;
}
