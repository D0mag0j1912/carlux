import { ApiProperty } from '@nestjs/swagger';
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
    expiresIn: number;

    @ApiProperty({
        type: Number,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
