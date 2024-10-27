import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { CarsEquipmentEntity } from '../car-filters/entity/cars-equipment.entity';
import { EquipmentEntity } from '../car-filters/entity/equipment.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CarEntity, ImageEntity, EquipmentEntity, CarsEquipmentEntity]),
    ],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
