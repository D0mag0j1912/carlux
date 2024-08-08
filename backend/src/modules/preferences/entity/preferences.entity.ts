import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../auth/entity/user.entity';
import { LanguageEntity } from '../../languages/entity/language.entity';

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
