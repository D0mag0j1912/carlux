import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './entity/car.entity';

@Injectable()
export class CarsService {
    constructor(@InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>) {}

    async getRecommendedCars(userId: number): Promise<void> {
        try {
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getRecommendedCars(userId: number): Promise<void> {
        const cars = await this._carsRepository.find({
            select: {},
        });
    }
}
