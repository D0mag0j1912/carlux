import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetLanguageDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    userId: string;
}
