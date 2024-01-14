import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageCode } from '../languages/enums/language-code';
import { LanguageEntity } from '../languages/entity/language.entity';
import { INITIAL_LANGUAGE } from '../auth/constants/initial-language';
import { PreferenceEntity } from './entity/preferences.entity';
import { PreferencesDto } from './models/preferences.dto';

@Injectable()
export class PreferencesService {
    constructor(
        @InjectRepository(PreferenceEntity)
        private _preferencesRepository: Repository<PreferenceEntity>,
        @InjectRepository(LanguageEntity) private _languageRepository: Repository<LanguageEntity>,
    ) {}

    async getPreferences(userId: number): Promise<PreferencesDto> {
        try {
            /*
            SELECT * FROM Languages L
            LEFT JOIN Preferences P ON L.Id = P.LanguageId
            WHERE P.UserId = <>
            */
            const language: LanguageEntity = await this._languageRepository
                .createQueryBuilder('L')
                .leftJoinAndSelect(PreferenceEntity, 'P', 'P.LanguageId = L.Id')
                .where('P.UserId = :userId', { userId })
                .getOne();
            const preferences: PreferencesDto = {
                userId,
                languageCode: language.LanguageCode,
            };
            return preferences;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async saveLanguage(languageCode: LanguageCode, userId: number): Promise<LanguageCode> {
        try {
            const preferences: PreferenceEntity[] = await this._preferencesRepository.find({
                select: {
                    Id: true,
                    UserId: true,
                    LanguageId: true,
                },
                where: {
                    UserId: userId,
                },
            });

            if (preferences.length) {
                const foundLanguages: LanguageEntity[] = await this._languageRepository.find({
                    select: {
                        Id: true,
                    },
                    where: {
                        LanguageCode: languageCode,
                    },
                });
                await this._preferencesRepository.update(userId, {
                    LanguageId: foundLanguages[0].Id,
                });
                return languageCode;
            } else {
                const language: LanguageEntity[] = await this._languageRepository.find({
                    select: {
                        Id: true,
                    },
                    where: {
                        LanguageCode: INITIAL_LANGUAGE,
                    },
                });
                const newPreference: PreferenceEntity = {
                    UserId: userId,
                    LanguageId: language[0].Id,
                };
                await this._preferencesRepository.save(newPreference);
                return language[0].LanguageCode as LanguageCode;
            }
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
