import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class VerifyCodeDto {
    @ApiProperty({
        type: String,
        isArray: false,
        required: true,
    })
    @IsNumber()
    @Length(4, 4)
    @IsNotEmpty()
    code: string;
}
