import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './cars.controller';
import { CarEntity } from './entity/car.entity';
import { CarsService } from './cars.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity])],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
