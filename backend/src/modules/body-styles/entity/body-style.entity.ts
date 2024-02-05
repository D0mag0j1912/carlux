import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'BodyStyles' })
export class BodyStyles {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column({ type: 'string' })
    Name: string;
}
