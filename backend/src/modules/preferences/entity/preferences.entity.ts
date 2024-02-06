import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LanguageEntity } from '../../languages/entity/language.entity';
import { UserEntity } from '../../auth/entity/user.entity';

@Entity({ name: 'Preferences' })
export class PreferenceEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    UserId: number;

    @Column()
    LanguageId: number;

    @ManyToOne(() => UserEntity, (user) => user.Id)
    @JoinColumn({ name: 'UserId' })
    user?: UserEntity;

    @ManyToOne(() => LanguageEntity, (language) => language.Id)
    @JoinColumn({ name: 'LanguageId' })
    language?: LanguageEntity;
}
