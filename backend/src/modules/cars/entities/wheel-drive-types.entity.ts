import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'WheelDriveTypes' })
export class WheelDriveTypeEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Type: string;
}
