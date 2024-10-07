import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PowerUnit } from '../../constants/power-type';
import { PaginationDto } from '../../models/pagination.dto';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { CarFilterDto } from './models/car-filter.dto';
import { CarListDto } from './models/car-list.dto';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>,
        @InjectRepository(ImageEntity) private _imageRepository: Repository<ImageEntity>,
    ) {}

    async filterCarList(query: CarFilterDto): Promise<PaginationDto<CarListDto>> {
        try {
            return this._filterCarList(query);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _filterCarList(query: CarFilterDto): Promise<PaginationDto<CarListDto>> {
        const brandId = query.brandId;
        const yearRegistrationFrom = query.yearRegistrationFrom;
        const yearRegistrationTo = query.yearRegistrationTo;
        const priceFrom = query.priceFrom;
        const priceTo = query.priceTo;
        const kilometersTravelledFrom = query.kilometersTravelledFrom;
        const kilometersTravelledTo = query.kilometersTravelledTo;
        const powerUnit = query.powerUnit;
        const powerFrom = query.powerFrom;
        const powerTo = query.powerTo;
        const transmissionTypes = query.transmissionTypes;
        const selectedEquipmentOptions = query.selectedEquipmentOptions ?? [];
        const selectedExteriorColors = query.selectedExteriorColors ?? [];
        const carFiltersQuery = this._carsRepository
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
            .leftJoin('car.carEquipments', 'carEquipments')
            .where(brandId ? 'car.BrandId = :brandId' : 'TRUE', { brandId })
            .andWhere(query.modelIds?.length ? 'car.ModelId IN (:...modelIds)' : 'TRUE', {
                modelIds: query.modelIds,
            })
            .andWhere(
                query.selectedEquipmentOptions?.length
                    ? 'carEquipments.equipment.Id IN (:...selectedEquipmentOptions)'
                    : 'TRUE',
                { selectedEquipmentOptions },
            )
            .andWhere(query.bodyStyles?.length ? 'car.BodyStyle IN (:...bodyStyles)' : 'TRUE', {
                bodyStyles: query.bodyStyles,
            })
            .andWhere(query.fuelTypes?.length ? 'car.FuelType IN (:...fuelTypes)' : 'TRUE', {
                fuelTypes: query.fuelTypes,
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
                    ? powerUnit === PowerUnit.PS
                        ? 'car.HorsePower >= :powerFrom'
                        : 'car.Kilowatts >: powerFrom'
                    : 'TRUE',
                { powerFrom },
            )
            .andWhere(
                powerTo
                    ? powerUnit === PowerUnit.PS
                        ? 'car.HorsePower <= :powerTo'
                        : 'car.Kilowatts <= powerTo'
                    : 'TRUE',
                { powerTo },
            )
            .andWhere(
                transmissionTypes?.length ? 'car.Transmission IN (:...transmissionTypes)' : 'TRUE',
                {
                    transmissionTypes: query.transmissionTypes,
                },
            )
            .andWhere(
                selectedExteriorColors.length
                    ? 'car.ExteriorColor IN (:...selectedExteriorColors)'
                    : 'TRUE',
                { selectedExteriorColors },
            )
            .skip((query.page - 1) * query.perPage)
            .take(query.perPage)
            .orderBy('car.UploadedDate', 'DESC');
        if (selectedEquipmentOptions.length) {
            carFiltersQuery
                .groupBy('car.Id')
                .having('COUNT(DISTINCT carEquipments.equipment.Id) = :count', {
                    count: selectedEquipmentOptions.length,
                });
        }
        const [carListEntities, carListTotalCount] = await carFiltersQuery.getManyAndCount();
        const imageEntities = await this._imageRepository.createQueryBuilder('image').getMany();
        const carList: CarListDto[] = carListEntities.map((carEntity: CarEntity) => ({
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
        }));
        const response: PaginationDto<CarListDto> = {
            page: query.page,
            perPage: query.perPage,
            results: carList,
            count: carListTotalCount,
        };
        return response;
    }

    async getCarsFiltersCount(query: CarFilterDto): Promise<number> {
        try {
            return this._getCarsFiltersCount(query);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getCarsFiltersCount(query: CarFilterDto): Promise<number> {
        const brandId = query.brandId;
        const yearRegistrationFrom = query.yearRegistrationFrom;
        const yearRegistrationTo = query.yearRegistrationTo;
        const priceFrom = query.priceFrom;
        const priceTo = query.priceTo;
        const kilometersTravelledFrom = query.kilometersTravelledFrom;
        const kilometersTravelledTo = query.kilometersTravelledTo;
        const powerUnit = query.powerUnit;
        const powerFrom = query.powerFrom;
        const powerTo = query.powerTo;
        const transmissionTypes = query.transmissionTypes;
        const selectedEquipmentOptions = query.selectedEquipmentOptions ?? [];
        const selectedExteriorColors = query.selectedExteriorColors ?? [];
        const carsCount = await this._carsRepository
            .createQueryBuilder('car')
            .leftJoin('car.currency', 'currency')
            .leftJoin('car.carBrand', 'carBrand')
            .leftJoin('car.carModel', 'carModel')
            .leftJoin('car.carEquipments', 'carEquipments')
            .where(brandId ? 'car.BrandId = :brandId' : 'TRUE', { brandId })
            .andWhere(query.modelIds?.length ? 'car.ModelId IN (:...modelIds)' : 'TRUE', {
                modelIds: query.modelIds,
            })
            .andWhere(
                query.selectedEquipmentOptions?.length
                    ? 'carEquipments.equipment.Id IN (:...selectedEquipmentOptions)'
                    : 'TRUE',
                { selectedEquipmentOptions },
            )
            .andWhere(query.bodyStyles?.length ? 'car.BodyStyle IN (:...bodyStyles)' : 'TRUE', {
                bodyStyles: query.bodyStyles,
            })
            .andWhere(query.fuelTypes?.length ? 'car.FuelType IN (:...fuelTypes)' : 'TRUE', {
                fuelTypes: query.fuelTypes,
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
                    ? powerUnit === PowerUnit.PS
                        ? 'car.HorsePower >= :powerFrom'
                        : 'car.Kilowatts >: powerFrom'
                    : 'TRUE',
                { powerFrom },
            )
            .andWhere(
                powerTo
                    ? powerUnit === PowerUnit.PS
                        ? 'car.HorsePower <= :powerTo'
                        : 'car.Kilowatts <= powerTo'
                    : 'TRUE',
                { powerTo },
            )
            .andWhere(
                transmissionTypes?.length ? 'car.Transmission IN (:...transmissionTypes)' : 'TRUE',
                {
                    transmissionTypes: query.transmissionTypes,
                },
            )
            .andWhere(
                selectedExteriorColors.length
                    ? 'car.ExteriorColor IN (:...selectedExteriorColors)'
                    : 'TRUE',
                { selectedExteriorColors },
            )
            .groupBy(selectedEquipmentOptions.length ? 'car.Id' : 'TRUE')
            .having(
                selectedEquipmentOptions.length
                    ? 'COUNT(DISTINCT carEquipments.equipment.Id) = :count'
                    : 'TRUE',
                {
                    count: selectedEquipmentOptions.length,
                },
            )
            .getCount();
        return carsCount;
    }
}
