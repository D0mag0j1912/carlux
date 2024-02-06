import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'WheelDriveTypes' })
export class WheelDriveTypes {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Type: string;
}
