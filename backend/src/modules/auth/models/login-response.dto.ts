import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginResponseDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({
        type: Number,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiPropertyOptional({
        type: Number,
        required: false,
    })
    @IsNumber()
    expiresIn?: number;

    @ApiPropertyOptional({
        type: String,
        required: false,
    })
    @IsString()
    expirationDate?: string;
}
