import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class VerifyCodeDto {
    @IsNumber()
    @Length(4, 4)
    @IsNotEmpty()
    code: string;
}
