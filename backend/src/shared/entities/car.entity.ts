import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BodyStyles } from '../../constants/body-style';
import { FuelType } from '../../constants/fuel-type';
import { SellerType } from '../../constants/seller-type';
import { Transmission } from '../../constants/transmission';
import { CurrencyEntity } from './currency.entity';
import { ImageEntity } from './image.entity';
import { WheelDriveTypeEntity } from './wheel-drive-types.entity';

@Entity({ name: 'Cars' })
export class CarEntity {
    @PrimaryGeneratedColumn()
    Id: number;

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
    Transmission: Transmission;

    @Column()
    EngineCodeName: string;

    @Column()
    FuelType: FuelType;

    @Column()
    ExteriorColor: string;

    @Column()
    InteriorColor: string;

    @Column()
    BodyKit: string;

    @Column()
    HorsePower: number;

    @Column()
    Kilowatts: number;

    @Column()
    FuelConsumptionCombined: number;

    @Column()
    FuelConsumptionCity: number;

    @Column()
    FuelConsumptionHighway: number;

    @Column()
    CO2Emissions: number;

    @Column()
    NumberOfCylinders: number;

    @Column()
    RimSize: number;

    @Column()
    SellerType: SellerType;

    @Column()
    UploadedDate: string;

    @Column()
    BodyStyle: BodyStyles;

    @Column()
    WheelDriveTypeId: number;

    @Column()
    CurrencyCode: string;

    @Column()
    IsFavourite: boolean;

    @Column({ nullable: true })
    AddedToFavouritesDate: string;

    @OneToOne(() => WheelDriveTypeEntity, (wheelDriveType) => wheelDriveType.Id)
    @JoinColumn({ name: 'WheelDriveTypeId' })
    wheelDriveType: WheelDriveTypeEntity;

    @OneToOne(() => CurrencyEntity, (currency) => currency.Code)
    @JoinColumn({ name: 'CurrencyCode' })
    currency: CurrencyEntity;

    @OneToMany(() => ImageEntity, (image) => image.car)
    images: ImageEntity[];
}
