import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../recommended-cars/entities/car.entity';
import { ImageEntity } from '../recommended-cars/entities/image.entity';
import { FavouritesListController } from './favourites-list.controller';
import { FavouritesListService } from './favourites-list.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [FavouritesListController],
    providers: [FavouritesListService],
})
export class FavouritesListModule {}
