import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Language' })
export class Language {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Language primary ID',
    })
    @PrimaryGeneratedColumn()
    Id: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Language code',
    })
    @Column()
    LanguageCode: string;
}
