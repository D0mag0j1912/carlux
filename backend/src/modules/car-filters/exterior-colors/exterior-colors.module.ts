import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExteriorColorsEntity } from '../entity/exterior-color.entity';
import { ExteriorColorsController } from './exterior-colors.controller';
import { ExteriorColorsService } from './exterior-colors.service';

@Module({
    imports: [TypeOrmModule.forFeature([ExteriorColorsEntity])],
    controllers: [ExteriorColorsController],
    providers: [ExteriorColorsService],
})
export class ExteriorColorsModule {}
