import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './cars.controller';
import { CarEntity } from './entities/car.entity';
import { CarsService } from './cars.service';
import { ImageEntity } from './entities/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
