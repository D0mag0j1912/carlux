import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StatusResponseDto {
    @ApiProperty({
        type: String,
        isArray: false,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty({
        type: Number,
        isArray: false,
        required: true,
    })
    status: HttpStatus;
}
