import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from '../languages/entity/language.entity';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { PreferenceEntity } from './entity/preferences.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PreferenceEntity, LanguageEntity])],
    controllers: [PreferencesController],
    providers: [PreferencesService],
})
export class PreferencesModule {}
