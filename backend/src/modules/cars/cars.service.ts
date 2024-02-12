import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './entities/car.entity';
import { CarDto } from './models/car.dto';

@Injectable()
export class CarsService {
    constructor(@InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>) {}

    async getRecommendedCars(): Promise<CarDto[]> {
        try {
            return this._getRecommendedCars();
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getRecommendedCars(): Promise<CarDto[]> {
        /**
         * SELECT car.Brand, car.ModelName, car.Price, cur.Symbol, car.KilometersTravelled, car.FirstRegistrationDate, car.CountryOrigin FROM Cars car
         * JOIN Currencies cur ON cur.Code = car.CurrencyCode;
         */
        const cars = await this._carsRepository
            .createQueryBuilder('car')
            .leftJoin('car.currency', 'currency')
            .select([
                'car.Brand',
                'car.ModelName',
                'car.Price',
                'currency.Symbol',
                'car.KilometersTravelled',
                'car.FirstRegistrationDate',
                'car.CountryOrigin',
            ])
            .execute();
        console.log(cars);
        return cars;
    }
}
