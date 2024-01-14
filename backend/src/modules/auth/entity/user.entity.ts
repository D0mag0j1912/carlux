import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class UserEntity {
    @ApiProperty({
        type: Number,
        required: false,
        description: 'Id of the user',
    })
    @PrimaryGeneratedColumn()
    Id?: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Users first name',
    })
    @Column()
    FirstName: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Users last name',
    })
    @Column()
    LastName: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Users birth date',
    })
    @Column()
    BirthDate: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Users email',
    })
    @Column()
    Email: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'Date when the user was created',
    })
    @Column({ nullable: true })
    CreatedAt: string;
}
