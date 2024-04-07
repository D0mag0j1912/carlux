import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../recommended-cars/entities/car.entity';
import { ImageEntity } from '../recommended-cars/entities/image.entity';
import { FavouritesListController } from './favorites-list.controller';
import { FavoritesListService } from './favorites-list.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [FavouritesListController],
    providers: [FavoritesListService],
})
export class FavoritesListModule {}
