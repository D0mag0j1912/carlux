import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExteriorColorsEntity } from '../entity/exterior-color.entity';
import { ExteriorColorDto } from './models/exterior-colors.dto';

@Injectable()
export class ExteriorColorsService {
    constructor(
        @InjectRepository(ExteriorColorsEntity)
        private _exteriorColorsRepository: Repository<ExteriorColorsEntity>,
    ) {}

    async getExteriorColors(): Promise<ExteriorColorDto[]> {
        try {
            return this._getExteriorColors();
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getExteriorColors(): Promise<ExteriorColorDto[]> {
        const exteriorColorEntities = await this._exteriorColorsRepository.find();
        const exteriorColors: ExteriorColorDto[] = exteriorColorEntities.map((entity) => ({
            hex: entity.Hex,
            name: entity.Name,
        }));
        return exteriorColors;
    }
}
