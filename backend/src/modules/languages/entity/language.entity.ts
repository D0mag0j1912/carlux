import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LanguageCode } from '../enums/language-code';

@Entity({ name: 'Languages' })
export class LanguageEntity {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Language primary ID',
    })
    @PrimaryGeneratedColumn()
    Id?: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Language code',
    })
    @Column({ enum: LanguageCode })
    LanguageCode: LanguageCode;
}
