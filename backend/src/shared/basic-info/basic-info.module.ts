import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrandEntity } from '../entities/car-brand.entity';
import { CarModelEntity } from '../entities/car-model.entity';
import { BasicInfoController } from './basic-info.controller';
import { BasicInfoService } from './basic-info.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarBrandEntity, CarModelEntity])],
    controllers: [BasicInfoController],
    providers: [BasicInfoService],
})
export class BasicInfoModule {}
