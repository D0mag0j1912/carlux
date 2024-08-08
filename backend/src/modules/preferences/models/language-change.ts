import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { LanguageCode } from '../../languages/enums/language-code';

export class LanguageChangeDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: "ID of the user who's changing the language",
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        enum: ['en', 'hr'],
        required: true,
        description: 'Language code',
    })
    languageCode: LanguageCode;
}
