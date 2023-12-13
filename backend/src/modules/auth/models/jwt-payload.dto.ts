import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JwtPayloadDto {
    @ApiProperty({
        type: Number,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    email: string;
}
