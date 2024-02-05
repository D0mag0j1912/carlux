import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LanguageEntity } from '../../languages/entity/language.entity';

@Entity({ name: 'Preferences' })
export class PreferenceEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column({ type: 'int' })
    UserId: number;

    @Column({ type: 'int' })
    LanguageId: number;

    @ManyToOne(() => LanguageEntity, (language) => language.Id)
    @JoinColumn({ name: 'LanguageId' })
    language?: LanguageEntity;
}
