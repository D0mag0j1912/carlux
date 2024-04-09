import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from '../recommended-cars/entities/car.entity';
import { ImageEntity } from '../recommended-cars/entities/image.entity';
import { GeneralResponseDto } from '../../models/general-response.dto';
import { FavoriteListUpdateQueryDto } from './models/favorite-list-query.dto';

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
}
