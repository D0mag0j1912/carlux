import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [FavouritesController],
    providers: [FavouritesService],
})
export class FavouritesModule {}
