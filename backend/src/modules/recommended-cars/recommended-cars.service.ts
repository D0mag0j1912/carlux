import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../models/pagination.dto';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { RecommendedCarsDto } from './models/recommended-cars.dto';

@Injectable()
export class RecommendedCarsService {
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
                'car.KilometersTravelled',
                'car.Price',
                'car.FirstRegistrationDate',
                'car.CountryOrigin',
                'car.NoOfPreviousOwners',
                'car.SellerType',
                'car.UploadedDate',
                'car.IsFavourite',
                'currency.Symbol',
                'carBrand.Title',
                'carModel.Title',
            ])
            .leftJoin('car.currency', 'currency')
            .leftJoin('car.carBrand', 'carBrand')
            .leftJoin('car.carModel', 'carModel')
            .skip((page - 1) * perPage)
            .take(perPage)
            .orderBy('car.UploadedDate', 'DESC')
            .getManyAndCount();
        const imageEntities = await this._imageRepository.createQueryBuilder('image').getMany();
        const recommendedCars: RecommendedCarsDto[] = recommendedCarsEntities.map(
            (carEntity: CarEntity) => ({
                id: carEntity.Id,
                brand: carEntity.carBrand.Title,
                kilometersTravelled: carEntity.KilometersTravelled,
                price: carEntity.Price,
                firstRegistrationDate: carEntity.FirstRegistrationDate,
                modelName: carEntity.carModel.Title,
                countryOrigin: carEntity.CountryOrigin,
                noOfPreviousOwners: carEntity.NoOfPreviousOwners,
                sellerType: carEntity.SellerType,
                currencySymbol: carEntity.currency.Symbol,
                images: imageEntities
                    .filter((imageEntity: ImageEntity) => imageEntity.CarId === carEntity.Id)
                    .map((imageEntity: ImageEntity) => imageEntity.Image),
                isFavourite: carEntity.IsFavourite,
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
