import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationParamsDto } from '../../models/pagination-params.dto';
import { PaginationDto } from '../../models/pagination.dto';
import { CarEntity } from './entities/car.entity';
import { RecommendedCarsDto } from './models/recommended-cars.dto';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class CarsService {
    constructor(@InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>) {}

    async getRecommendedCars(
        paginationParams: PaginationParamsDto,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        try {
            return this._getRecommendedCars(paginationParams);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getRecommendedCars(
        paginationParams: PaginationParamsDto,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
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
            .limit(paginationParams.perPage)
            .offset((paginationParams.page - 1) * paginationParams.perPage)
            .orderBy('car.UploadedDate', 'DESC')
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
        const response: PaginationDto<RecommendedCarsDto> = {
            page: paginationParams.page,
            perPage: paginationParams.perPage,
            results: recommendedCars,
            count: 0,
        };
        return response;
    }
}
