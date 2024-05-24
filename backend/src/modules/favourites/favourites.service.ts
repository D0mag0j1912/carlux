import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralResponseDto } from '../../models/general-response.dto';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { HandleFavourites } from './constants/handle-favourites';
import { FavouritesDto } from './models/favourites.dto';

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(CarEntity) private _carsRepository: Repository<CarEntity>,
        @InjectRepository(ImageEntity) private _imageRepository: Repository<ImageEntity>,
    ) {}

    async handleFavouritesActions(
        carId: number,
        method: HandleFavourites,
    ): Promise<GeneralResponseDto> {
        try {
            return this._handleFavouritesActions(carId, method);
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _handleFavouritesActions(
        carId: number,
        method: HandleFavourites,
    ): Promise<GeneralResponseDto> {
        let selectedCar = await this._carsRepository.findOne({
            where: { Id: carId },
        });
        selectedCar = {
            ...selectedCar,
            IsFavourite: method === HandleFavourites.ADD,
            AddedToFavouritesDate:
                method === HandleFavourites.ADD ? new Date().toISOString() : null,
        };
        await this._carsRepository.save(selectedCar);
        return { success: true };
    }

    async getFavourites(): Promise<FavouritesDto[]> {
        try {
            return this._getFavourites();
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getFavourites(): Promise<FavouritesDto[]> {
        const carEntityQuery = await this._carsRepository
            .createQueryBuilder('car')
            .select([
                'car.Id',
                'car.Price',
                'currency.Symbol',
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
                'carBrand.Title',
                'carModel.Title',
            ])
            .leftJoin('car.currency', 'currency')
            .leftJoin('car.carBrand', 'carBrand')
            .leftJoin('car.carModel', 'carModel')
            .where('car.IsFavourite = :IsFavourite', { IsFavourite: true })
            .orderBy('car.AddedToFavouritesDate', 'DESC')
            .getMany();
        const imageEntities = await this._imageRepository.createQueryBuilder('image').getMany();
        const favourites: FavouritesDto[] = carEntityQuery.map((carEntity: CarEntity) => ({
            id: carEntity.Id,
            images: imageEntities
                .filter((imageEntity: ImageEntity) => imageEntity.CarId === carEntity.Id)
                .map((imageEntity: ImageEntity) => imageEntity.Image),
            price: carEntity.Price,
            currencySymbol: carEntity.currency.Symbol,
            brand: carEntity.carBrand.Title,
            modelName: carEntity.carModel.Title,
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
        return favourites;
    }
}
