import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../models/pagination.dto';
import { CarEntity } from './entities/car.entity';
import { RecommendedCarsDto } from './models/recommended-cars.dto';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>,
        @InjectRepository(ImageEntity) private _imageRepository: Repository<ImageEntity>,
    ) {}

    async getRecommendedCars(
        page: number,
        perPage: number,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        try {
            return this._getRecommendedCars(page, perPage);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getRecommendedCars(
        page: number,
        perPage: number,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        const [recommendedCarsEntities, recommendedCarsTotalCount] = await this._carsRepository
            .createQueryBuilder('car')
            .select([
                'car.Id',
                'car.Brand',
                'car.KilometersTravelled',
                'car.Price',
                'car.FirstRegistrationDate',
                'car.ModelName',
                'car.CountryOrigin',
                'car.NoOfPreviousOwners',
                'car.UploadedDate',
                'currency.Symbol',
            ])
            .leftJoin('car.currency', 'currency')
            .skip((page - 1) * perPage)
            .take(perPage)
            .orderBy('car.UploadedDate', 'DESC')
            .getManyAndCount();
        const imageEntities = await this._imageRepository.createQueryBuilder('image').getMany();
        const recommendedCars: RecommendedCarsDto[] = recommendedCarsEntities.map(
            (carEntity: CarEntity) => ({
                id: carEntity.Id,
                brand: carEntity.Brand,
                kilometersTravelled: carEntity.KilometersTravelled,
                price: carEntity.Price,
                firstRegistrationDate: carEntity.FirstRegistrationDate,
                modelName: carEntity.ModelName,
                countryOrigin: carEntity.CountryOrigin,
                noOfPreviousOwners: carEntity.NoOfPreviousOwners,
                currencySymbol: carEntity.currency.Symbol,
                images: imageEntities
                    .filter((imageEntity: ImageEntity) => imageEntity.CarId === carEntity.Id)
                    .map((imageEntity: ImageEntity) => imageEntity.Image),
            }),
        );
        const response: PaginationDto<RecommendedCarsDto> = {
            page: page,
            perPage: perPage,
            results: recommendedCars,
            count: recommendedCarsTotalCount,
        };
        return response;
    }
}
