import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../../shared/entities/car.entity';
import { ImageEntity } from '../../shared/entities/image.entity';
import { RecommendedCarsController } from './recommended-cars.controller';
import { RecommendedCarsService } from './recommended-cars.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [RecommendedCarsController],
    providers: [RecommendedCarsService],
})
export class RecommendedCarsModule {}
