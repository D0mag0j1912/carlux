import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { CarDetailsDto } from '../car-details/models/car-details.dto';

@Injectable()
export class CarDetailsService {
    constructor(
        @InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>,
        @InjectRepository(ImageEntity) private _imageRepository: Repository<ImageEntity>,
    ) {}

    async getCarDetails(carId: number): Promise<CarDetailsDto> {
        try {
            return this._getCarDetails(carId);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getCarDetails(carId: number): Promise<CarDetailsDto> {
        const car = await this._carsRepository
            .createQueryBuilder('car')
            .select([
                'car.Id',
                'car.KilometersTravelled',
                'car.Price',
                'car.FirstRegistrationDate',
                'car.ReleaseDate',
                'car.CountryOrigin',
                'car.NoOfPreviousOwners',
                'car.Transmission',
                'car.EngineCodeName',
                'car.FuelType',
                'car.BodyKit',
                'car.HorsePower',
                'car.Kilowatts',
                'car.FuelConsumptionCombined',
                'car.FuelConsumptionCity',
                'car.FuelConsumptionHighway',
                'car.CO2Emissions',
                'car.NumberOfCylinders',
                'car.RimSize',
                'car.SellerType',
                'car.UploadedDate',
                'car.IsFavourite',
                'car.BodyStyle',
                'wdt.Type',
                'cur.Symbol',
                'carBrand.Title',
                'carModel.Title',
                'exteriorColor.Name',
                'interiorColor.Name',
            ])
            .innerJoin('car.wheelDriveType', 'wdt')
            .innerJoin('car.currency', 'cur')
            .innerJoin('car.carBrand', 'carBrand')
            .innerJoin('car.carModel', 'carModel')
            .innerJoin('car.exteriorColor', 'exteriorColor')
            .innerJoin('car.interiorColor', 'interiorColor')
            .where('car.Id = :carId', { carId })
            .getOne();
        const imageEntities: ImageEntity[] = await this._imageRepository.find({
            select: {
                Image: true,
            },
            where: {
                CarId: carId,
            },
        });
        const carDto: CarDetailsDto = {
            id: car.Id,
            brand: car.carBrand.Title,
            kilometersTravelled: car.KilometersTravelled,
            price: car.Price,
            firstRegistrationDate: car.FirstRegistrationDate,
            releaseDate: car.ReleaseDate,
            modelName: car.carModel.Title,
            countryOrigin: car.CountryOrigin,
            noOfPreviousOwners: car.NoOfPreviousOwners,
            transmission: car.Transmission,
            engineCodeName: car.EngineCodeName,
            fuelType: car.FuelType,
            exteriorColor: car.exteriorColor.Name,
            interiorColor: car.interiorColor.Name,
            bodyKit: car.BodyKit,
            horsePower: car.HorsePower,
            kilowatts: car.Kilowatts,
            fuelConsumptionCombined: car.FuelConsumptionCombined,
            fuelConsumptionCity: car.FuelConsumptionCity,
            fuelConsumptionHighway: car.FuelConsumptionHighway,
            co2Emissions: car.CO2Emissions,
            numberOfCylinders: car.NumberOfCylinders,
            rimSize: car.RimSize,
            sellerType: car.SellerType,
            uploadedDate: car.UploadedDate,
            bodyStyle: car.BodyStyle,
            wheelDriveType: car.wheelDriveType.Type,
            currencySymbol: car.currency.Symbol,
            images: imageEntities.map((imageEntity: ImageEntity) => imageEntity.Image),
            isFavourite: car.IsFavourite,
        };
        return carDto;
    }
}
