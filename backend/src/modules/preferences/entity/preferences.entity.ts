import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Language } from '../../languages/entity/language.entity';

@Entity({ name: 'Preferences' })
export class Preference {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Preference primary ID',
    })
    @PrimaryGeneratedColumn()
    Id?: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'User ID',
    })
    @Column({ type: 'int' })
    UserId: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Language ID',
    })
    @Column({ type: 'int' })
    LanguageId: number;

    @ManyToOne(() => Language, (language) => language.Id)
    @JoinColumn({ name: 'LanguageId' })
    language?: Language;
}
