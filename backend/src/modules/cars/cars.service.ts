import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './entities/car.entity';
import { RecommendedCarsDto } from './models/recommended-cars.dto';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class CarsService {
    constructor(@InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>) {}

    async getRecommendedCars(): Promise<RecommendedCarsDto[]> {
        try {
            return this._getRecommendedCars();
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getRecommendedCars(): Promise<RecommendedCarsDto[]> {
        const cars: CarEntity[] = await this._carsRepository
            .createQueryBuilder('car')
            .leftJoin('car.currency', 'currency')
            .leftJoin('car.images', 'image')
            .select([
                'car.Id',
                'car.Brand',
                'car.KilometersTravelled',
                'car.Price',
                'car.FirstRegistrationDate',
                'car.ModelName',
                'car.CountryOrigin',
                'car.NoOfPreviousOwners',
                'currency.Symbol',
                'image.Image',
            ])
            .getMany();
        const recommendedCars: RecommendedCarsDto[] = cars.map((carEntity: CarEntity) => ({
            id: carEntity.Id,
            brand: carEntity.Brand,
            kilometersTravelled: carEntity.KilometersTravelled,
            price: carEntity.Price,
            firstRegistrationDate: carEntity.FirstRegistrationDate,
            modelName: carEntity.ModelName,
            countryOrigin: carEntity.CountryOrigin,
            noOfPreviousOwners: carEntity.NoOfPreviousOwners,
            currencySymbol: carEntity.currency.Symbol,
            images: carEntity.images.map((imageEntity: ImageEntity) => imageEntity.Image),
        }));
        return recommendedCars;
    }
}
