import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BodyStyles } from '../../constants/body-style';
import { FuelType } from '../../constants/fuel-type';
import { SellerType } from '../../constants/seller-type';
import { TransmissionType } from '../../constants/transmission-type';
import { CarsEquipmentEntity } from '../../modules/car-filters/entity/cars-equipment.entity';
import { ExteriorColorEntity } from '../../modules/car-filters/entity/exterior-color.entity';
import { CarBrandEntity } from './car-brand.entity';
import { CarModelEntity } from './car-model.entity';
import { CurrencyEntity } from './currency.entity';
import { ImageEntity } from './image.entity';
import { WheelDriveTypeEntity } from './wheel-drive-types.entity';

@Entity({ name: 'Cars' })
export class CarEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    BrandId: number;

    @Column()
    ModelId: number;

    @Column()
    KilometersTravelled: number;

    @Column()
    Price: number;

    @Column()
    FirstRegistrationDate: string;

    @Column()
    ReleaseDate: string;

    @Column()
    CountryOrigin: string;

    @Column()
    NoOfPreviousOwners: number;

    @Column()
    Transmission: TransmissionType;

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

    @Column()
    ExteriorColorHex: string;

    @Column({ nullable: true })
    AddedToFavouritesDate: string;

    @OneToOne(() => CarBrandEntity, (carBrandEntity) => carBrandEntity.Id)
    @JoinColumn({ name: 'BrandId' })
    carBrand: CarBrandEntity;

    @OneToOne(() => CarModelEntity, (carModelEntity) => carModelEntity.Id)
    @JoinColumn({ name: 'ModelId' })
    carModel: CarModelEntity;

    @OneToOne(() => WheelDriveTypeEntity, (wheelDriveType) => wheelDriveType.Id)
    @JoinColumn({ name: 'WheelDriveTypeId' })
    wheelDriveType: WheelDriveTypeEntity;

    @OneToOne(() => CurrencyEntity, (currency) => currency.Code)
    @JoinColumn({ name: 'CurrencyCode' })
    currency: CurrencyEntity;

    @OneToOne(() => ExteriorColorEntity, (exteriorColor) => exteriorColor.Hex)
    @JoinColumn({ name: 'ExteriorColorHex' })
    exteriorColor: ExteriorColorEntity;

    @OneToMany(() => ImageEntity, (image) => image.car)
    images: ImageEntity[];

    @OneToMany(() => CarsEquipmentEntity, (carEquipment) => carEquipment.car)
    carEquipments: CarsEquipmentEntity[];
}
