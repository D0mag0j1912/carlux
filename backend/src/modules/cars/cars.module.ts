import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
