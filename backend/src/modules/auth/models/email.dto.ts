import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    email: string;
}
