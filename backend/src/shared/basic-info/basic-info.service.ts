import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarBrandEntity } from '../entities/car-brand.entity';
import { CarModelEntity } from '../entities/car-model.entity';
import { CarBrandDto } from './models/car-brand.dto';
import { CarModelDto } from './models/car-model.dto';

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

    async getCarModels(carBrandId: number): Promise<CarModelDto[]> {
        try {
            return this._getCarModels(carBrandId);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getCarModels(carBrandId: number): Promise<CarModelDto[]> {
        const carModelEntities = await this._carModelRepository.find({
            where: { BrandId: carBrandId },
        });
        const carModels: CarModelDto[] = carModelEntities.map((model) => ({
            id: model.Id,
            brandId: model.BrandId,
            code: model.Code,
            title: model.Title,
        }));
        return carModels;
    }
}
