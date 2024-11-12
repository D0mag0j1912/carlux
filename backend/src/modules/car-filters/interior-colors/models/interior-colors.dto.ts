import { ApiProperty } from '@nestjs/swagger';

export class InteriorColorsDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Interior color hex code',
    })
    hex: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Interior color name',
    })
    name: string;
}
