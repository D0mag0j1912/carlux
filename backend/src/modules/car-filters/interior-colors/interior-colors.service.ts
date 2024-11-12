import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InteriorColorEntity } from '../entity/interior-color.entity';
import { InteriorColorsDto } from './models/interior-colors.dto';

@Injectable()
export class InteriorColorsService {
    constructor(
        @InjectRepository(InteriorColorEntity)
        private _interiorColorsRepository: Repository<InteriorColorEntity>,
    ) {}

    async getInteriorColors(): Promise<InteriorColorsDto[]> {
        try {
            return this._getInteriorColors();
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }

    private async _getInteriorColors(): Promise<InteriorColorsDto[]> {
        const interiorColorEntities = await this._interiorColorsRepository.find();
        const interiorColors: InteriorColorsDto[] = interiorColorEntities.map((entity) => ({
            hex: entity.Hex,
            name: entity.Name,
        }));
        return interiorColors;
    }
}
