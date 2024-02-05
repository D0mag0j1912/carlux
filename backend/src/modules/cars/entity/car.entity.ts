import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Cars' })
export class CarEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column({ type: 'string' })
    CarBrand: string;

    @Column({ type: 'float' })
    Price: number;

    @Column({ type: 'string' })
    FirstRegistrationDate: string;

    @Column({ type: 'string' })
    ReleaseDate: string;

    @Column({ type: 'string' })
    ModelName: string;

    @Column({ type: 'string' })
    CountryOrigin: string;

    @Column({ type: 'int' })
    NoOfPreviousOwners: number;

    @Column({ type: 'string' })
    Color: string;

    @Column({ type: 'string' })
    BodyKit: string;

    @Column({ type: 'int' })
    HorsePower: number;

    @Column({ type: 'float' })
    Kilowats: number;

    @Column({ type: 'float' })
    FuelConsumption: number;

    @Column({ type: 'float' })
    CO2Emissions: number;

    @Column({ type: 'int' })
    NumberOfCylinders: number;

    @Column({ type: 'int' })
    RimSize: number;

    @Column({ type: 'int' })
    BodyStyleId: number;

    @Column({ type: 'int' })
    WheelDriveTypeId: number;
}
