import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class VerifyCodeDto {
    @ApiProperty({
        type: Number,
        isArray: false,
        required: true,
    })
    @Type(() => Number)
    @IsNumber()
    @Min(1000)
    @Max(10000)
    @IsNotEmpty()
    code: number;
}
