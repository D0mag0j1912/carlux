import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BodyStyleEntity } from './body-style.entity';
import { WheelDriveTypeEntity } from './wheel-drive-types.entity';
import { CurrencyEntity } from './currency.entity';
import { ImageEntity } from './image.entity';

@Entity({ name: 'Cars' })
export class CarEntity {
    @PrimaryGeneratedColumn()
    Id?: number;

    @Column()
    Brand: string;

    @Column()
    KilometersTravelled: number;

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
    UploadedDate: string;

    @Column()
    BodyStyleId: number;

    @Column()
    WheelDriveTypeId: number;

    @Column()
    CurrencyCode: string;

    @OneToOne(() => BodyStyleEntity, (bodyStyle) => bodyStyle.Id)
    @JoinColumn({ name: 'BodyStyleId' })
    bodyStyle: BodyStyleEntity;

    @OneToOne(() => WheelDriveTypeEntity, (wheelDriveType) => wheelDriveType.Id)
    @JoinColumn({ name: 'WheelDriveTypeId' })
    wheelDriveType: WheelDriveTypeEntity;

    @OneToOne(() => CurrencyEntity, (currency) => currency.Code)
    @JoinColumn({ name: 'CurrencyCode' })
    currency: CurrencyEntity;

    @OneToMany(() => ImageEntity, (image) => image.car)
    images: ImageEntity[];
}
