import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BodyStyleEntity } from '../../body-styles/entity/body-style.entity';
import { WheelDriveTypeEntity } from '../../wheel-drive-types/entity/wheel-drive-types.entity';

@Entity({ name: 'Cars' })
export class CarEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    CarBrand: string;

    @Column()
    Price: number;

    @Column()
    FirstRegistrationDate: string;

    @Column()
    ReleaseDate: string;

    @Column()
    ModelName: string;

    @Column()
    CountryOrigin: string;

    @Column()
    NoOfPreviousOwners: number;

    @Column()
    Color: string;

    @Column()
    BodyKit: string;

    @Column()
    HorsePower: number;

    @Column()
    Kilowats: number;

    @Column()
    FuelConsumption: number;

    @Column()
    CO2Emissions: number;

    @Column()
    NumberOfCylinders: number;

    @Column()
    RimSize: number;

    @Column()
    BodyStyleId: number;

    @Column()
    WheelDriveTypeId: number;

    @ManyToOne(() => BodyStyleEntity, (bodyStyle) => bodyStyle.Id)
    @JoinColumn({ name: 'BodyStyleId' })
    bodyStyle?: BodyStyleEntity;

    @ManyToOne(() => WheelDriveTypeEntity, (wheelDriveType) => wheelDriveType.Id)
    @JoinColumn({ name: 'WheelDriveTypeId' })
    wheelDriveType?: WheelDriveTypeEntity;
}
