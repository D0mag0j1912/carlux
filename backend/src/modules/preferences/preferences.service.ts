import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageCode } from '../languages/enums/language-code';
import { Language } from '../languages/entity/language.entity';
import { Preference } from './entity/preferences.entity';

@Injectable()
export class PreferencesService {
    readonly INITIAL_LANGUAGE = LanguageCode.EN;

    constructor(
        @InjectRepository(Preference) private _preferencesRepository: Repository<Preference>,
        @InjectRepository(Language) private _languageRepository: Repository<Language>,
    ) {}

    async saveLanguage(languageCode: LanguageCode, userId: number): Promise<LanguageCode> {
        try {
            const preferences: Preference[] = await this._preferencesRepository.find({
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
                const foundLanguages: Language[] = await this._languageRepository.find({
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
                const language: Language[] = await this._languageRepository.find({
                    select: {
                        Id: true,
                    },
                    where: {
                        LanguageCode: this.INITIAL_LANGUAGE,
                    },
                });
                const newPreference: Preference = {
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
