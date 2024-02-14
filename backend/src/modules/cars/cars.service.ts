import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './entities/car.entity';
import { RecommendedCarsDto } from './models/recommended-cars.dto';

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
            ])
            .getMany();
        const carData: RecommendedCarsDto[] = cars.map((car: CarEntity) => ({
            id: car.Id,
            brand: car.Brand,
            kilometersTravelled: car.KilometersTravelled,
            price: car.Price,
            firstRegistrationDate: car.FirstRegistrationDate,
            modelName: car.ModelName,
            countryOrigin: car.CountryOrigin,
            noOfPreviousOwners: car.NoOfPreviousOwners,
            symbol: car.currency.Symbol,
        }));
        return carData;
    }
}
