import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LanguageEntity } from '../../languages/entity/language.entity';

@Entity({ name: 'Preferences' })
export class PreferenceEntity {
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

    @ManyToOne(() => LanguageEntity, (language) => language.Id)
    @JoinColumn({ name: 'LanguageId' })
    language?: LanguageEntity;
}
