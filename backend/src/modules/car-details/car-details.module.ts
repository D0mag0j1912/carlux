import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../recommended-cars/entities/car.entity';
import { ImageEntity } from '../recommended-cars/entities/image.entity';
import { CarDetailsController } from './car-details.controller';
import { CarDetailsService } from './car-details.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [CarDetailsController],
    providers: [CarDetailsService],
})
export class CarDetailsModule {}
