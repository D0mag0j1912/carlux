import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
