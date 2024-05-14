import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarBrandEntity } from '../entities/car-brand.entity';
import { CarModelEntity } from '../entities/car-model.entity';
import { CarBrandDto } from './models/car-brand';

@Injectable()
export class BasicInfoService {
    constructor(
        @InjectRepository(CarBrandEntity) private _carBrandRepository: Repository<CarBrandEntity>,
        @InjectRepository(CarModelEntity) private _carModelRepository: Repository<CarModelEntity>,
    ) {}

    async getCarBrands(): Promise<CarBrandDto[]> {
        try {
            return this._getCarBrands();
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getCarBrands(): Promise<CarBrandDto[]> {
        const carBrandEntities = await this._carBrandRepository.find();
        const carBrands: CarBrandDto[] = carBrandEntities.map((entity: CarBrandEntity) => ({
            id: entity.Id,
            code: entity.Code,
            title: entity.Title,
        }));
        return carBrands;
    }
}
