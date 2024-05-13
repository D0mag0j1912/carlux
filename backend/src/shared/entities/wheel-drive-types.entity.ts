import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WheelDrivesType } from '../../constants/wheel-drive';

@Entity({ name: 'WheelDriveTypes' })
export class WheelDriveTypeEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Type: WheelDrivesType;
}
