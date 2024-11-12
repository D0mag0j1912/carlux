import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteriorColorEntity } from '../entity/interior-color.entity';
import { InteriorColorsController } from './interior-colors.controller';
import { InteriorColorsService } from './interior-colors.service';

@Module({
    imports: [TypeOrmModule.forFeature([InteriorColorEntity])],
    controllers: [InteriorColorsController],
    providers: [InteriorColorsService],
})
export class InteriorColorsModule {}
