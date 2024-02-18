import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'BodyStyles' })
export class BodyStyleEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Name: string;
}
