import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from '../languages/entity/language.entity';
import { PreferenceEntity } from './entity/preferences.entity';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';

@Module({
    imports: [TypeOrmModule.forFeature([PreferenceEntity, LanguageEntity])],
    controllers: [PreferencesController],
    providers: [PreferencesService],
})
export class PreferencesModule {}
