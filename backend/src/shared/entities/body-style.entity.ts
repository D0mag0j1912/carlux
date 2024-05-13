import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BodyStyles } from '../../constants/body-style';

@Entity({ name: 'BodyStyles' })
export class BodyStyleEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Name: BodyStyles;
}
