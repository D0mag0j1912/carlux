import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '../../languages/enums/language-code';

export class PreferencesDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'User ID',
    })
    userId: number;

    @ApiProperty({
        enum: ['en', 'hr'],
        required: true,
        description: 'Code of the language',
    })
    languageCode: LanguageCode;
}
