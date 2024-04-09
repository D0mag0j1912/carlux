import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from '../recommended-cars/entities/car.entity';
import { ImageEntity } from '../recommended-cars/entities/image.entity';
import { GeneralResponseDto } from '../../models/general-response.dto';
import { FavoriteListUpdateQueryDto } from './models/favorite-list-query.dto';
import { FavoriteListDto } from './models/favorite-list.dto';

@Injectable()
export class FavoritesListService {
    constructor(
        @InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>,
        @InjectRepository(ImageEntity) private _imageRepository: Repository<ImageEntity>,
    ) {}

    async saveToFavoriteList(
        favoriteListUpdateQuery: FavoriteListUpdateQueryDto,
    ): Promise<GeneralResponseDto> {
        try {
            return this._saveToFavoriteList(favoriteListUpdateQuery);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _saveToFavoriteList(
        favoriteListUpdateQuery: FavoriteListUpdateQueryDto,
    ): Promise<GeneralResponseDto> {
        let selectedCar = await this._carsRepository.findOne({
            where: { Id: favoriteListUpdateQuery.carId },
        });
        selectedCar = {
            ...selectedCar,
            IsFavorite: true,
            AddedToFavoritesDate: new Date().toISOString(),
        };
        await this._carsRepository.save(selectedCar);
        return { success: true };
    }

    async getFavoriteList(): Promise<FavoriteListDto[]> {
        try {
            return this._getFavoriteList();
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getFavoriteList(): Promise<FavoriteListDto[]> {
        const carEntityQuery = await this._carsRepository
            .createQueryBuilder('car')
            .select([
                'car.Id',
                'car.Price',
                'currency.Symbol',
                'car.Brand',
                'car.ModelName',
                'car.KilometersTravelled',
                'car.HorsePower',
                'car.Kilowatts',
                'car.NoOfPreviousOwners',
                'car.FuelConsumptionCombined',
                'car.FirstRegistrationDate',
                'car.Transmission',
                'car.FuelType',
                'car.CO2Emissions',
                'car.SellerType',
                'car.CountryOrigin',
            ])
            .leftJoin('car.currency', 'currency')
            .where('car.IsFavorite = :IsFavorite', { IsFavorite: true })
            .orderBy('car.AddedToFavoritesDate', 'DESC')
            .getMany();
        const imageEntities = await this._imageRepository.createQueryBuilder('image').getMany();
        const favoriteList: FavoriteListDto[] = carEntityQuery.map((carEntity: CarEntity) => ({
            id: carEntity.Id,
            images: imageEntities
                .filter((imageEntity: ImageEntity) => imageEntity.CarId === carEntity.Id)
                .map((imageEntity: ImageEntity) => imageEntity.Image),
            price: carEntity.Price,
            brand: carEntity.Brand,
            modelName: carEntity.ModelName,
            kilometersTravelled: carEntity.KilometersTravelled,
            horsePower: carEntity.HorsePower,
            kilowatts: carEntity.Kilowatts,
            noOfPreviousOwners: carEntity.NoOfPreviousOwners,
            fuelConsumptionCombined: carEntity.FuelConsumptionCombined,
            firstRegistrationDate: carEntity.FirstRegistrationDate,
            transmission: carEntity.Transmission,
            fuelType: carEntity.FuelType,
            co2Emissions: carEntity.CO2Emissions,
            sellerType: carEntity.SellerType,
            countryOrigin: carEntity.CountryOrigin,
        }));
        return favoriteList;
    }
}
