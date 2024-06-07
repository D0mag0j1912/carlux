import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PowerMetric } from '../../constants/power-type';
import { PaginationDto } from '../../models/pagination.dto';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { CarFilterDto } from './models/car-filter.dto';
import { RecommendedCarsDto } from './models/recommended-cars.dto';

@Injectable()
export class RecommendedCarsService {
    constructor(
        @InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>,
        @InjectRepository(ImageEntity) private _imageRepository: Repository<ImageEntity>,
    ) {}

    async getRecommendedCars(query: CarFilterDto): Promise<PaginationDto<RecommendedCarsDto>> {
        try {
            if (query.brandId) {
                return this._filterRecommendedCars(query);
            } else {
                return this._getRecommendedCars(query);
            }
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getRecommendedCars(
        query: CarFilterDto,
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
            .skip((query.page - 1) * query.perPage)
            .take(query.perPage)
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
            page: query.page,
            perPage: query.perPage,
            results: recommendedCars,
            count: recommendedCarsTotalCount,
        };
        return response;
    }

    private async _filterRecommendedCars(
        query: CarFilterDto,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        const yearRegistrationFrom = query.yearRegistrationFrom;
        const yearRegistrationTo = query.yearRegistrationTo;
        const priceFrom = query.priceFrom;
        const priceTo = query.priceTo;
        const kilometersTravelledFrom = query.kilometersTravelledFrom;
        const kilometersTravelledTo = query.kilometersTravelledTo;
        const powerMetric = query.powerMetric;
        const powerFrom = query.powerFrom;
        const powerTo = query.powerTo;
        const transmission = query.transmission;
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
            .where('car.BrandId = :brandId', { brandId: query.brandId })
            .andWhere(query.modelId ? 'car.ModelId = :modelId' : 'TRUE', { modelId: query.modelId })
            .andWhere(query.bodyStyle ? 'car.BodyStyle = :bodyStyle' : 'TRUE', {
                bodyStyle: query.bodyStyle,
            })
            .andWhere(query.fuelType ? 'car.FuelType = :fuelType' : 'TRUE', {
                fuelType: query.fuelType,
            })
            .andWhere(
                yearRegistrationFrom
                    ? 'YEAR(car.FirstRegistrationDate) >= :yearRegistrationFrom'
                    : 'TRUE',
                {
                    yearRegistrationFrom,
                },
            )
            .andWhere(
                yearRegistrationTo
                    ? 'YEAR(car.FirstRegistrationDate) <= :yearRegistrationTo'
                    : 'TRUE',
                { yearRegistrationTo },
            )
            .andWhere(priceFrom ? 'car.Price >= :priceFrom' : 'TRUE', { priceFrom })
            .andWhere(priceTo ? 'car.Price <= :priceTo' : 'TRUE', { priceTo })
            .andWhere(
                kilometersTravelledFrom
                    ? 'car.KilometersTravelled >= :kilometersTravelledFrom'
                    : 'TRUE',
                { kilometersTravelledFrom },
            )
            .andWhere(
                kilometersTravelledTo
                    ? 'car.KilometersTravelled <= :kilometersTravelledTo'
                    : 'TRUE',
                { kilometersTravelledTo },
            )
            .andWhere(
                powerFrom
                    ? powerMetric === PowerMetric.PS
                        ? 'car.HorsePower >= :powerFrom'
                        : 'car.Kilowatts >: powerFrom'
                    : 'TRUE',
                { powerFrom },
            )
            .andWhere(
                powerTo
                    ? powerMetric === PowerMetric.PS
                        ? 'car.HorsePower <= :powerTo'
                        : 'car.Kilowatts <= powerTo'
                    : 'TRUE',
                { powerTo },
            )
            .andWhere(transmission ? 'car.Transmission = :transmission' : 'TRUE', { transmission })
            .skip((query.page - 1) * query.perPage)
            .take(query.perPage)
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
            page: query.page,
            perPage: query.perPage,
            results: recommendedCars,
            count: recommendedCarsTotalCount,
        };
        return response;
    }
}
