import { ApiProperty } from '@nestjs/swagger';

export class ExteriorColorDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Exterior color hex code',
    })
    hex: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Exterior color name',
    })
    name: string;
}
