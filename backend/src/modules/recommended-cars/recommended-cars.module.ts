import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendedCarsController } from './recommended-cars.controller';
import { CarEntity } from './entities/car.entity';
import { RecommendedCarsService } from './recommended-cars.service';
import { ImageEntity } from './entities/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ImageEntity])],
    controllers: [RecommendedCarsController],
    providers: [RecommendedCarsService],
})
export class RecommendedCarsModule {}
