import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    @Column()
    UserId: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Language ID',
    })
    @OneToMany((type) => Language, (language) => language.Id)
    LanguageId: number;
}
