import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column({ nullable: true })
    Avatar: string;

    @Column()
    BirthDate: string;

    @Column()
    Email: string;

    @Column({ nullable: true })
    CreatedAt: string;
}
