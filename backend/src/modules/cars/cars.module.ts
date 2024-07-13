import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastNumberToArrayPipe } from '../../pipes/cast-number-to-array.pipe';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [CarsController],
    providers: [CarsService, CastNumberToArrayPipe],
})
export class CarsModule {}
