import { ApiProperty } from '@nestjs/swagger';

export class GeneralResponseDto {
    @ApiProperty({
        type: Boolean,
        required: true,
    })
    success: boolean;
}
