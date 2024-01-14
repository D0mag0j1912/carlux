import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPreferencesDto {
    @ApiProperty({
        type: Number,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    userId: number;
}
