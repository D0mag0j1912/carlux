import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    BirthDate: string;

    @Column()
    Email: string;

    @Column()
    CreatedAt: Date;
}
