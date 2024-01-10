import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from '../languages/entity/language.entity';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { Preference } from './entity/preferences.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Preference, Language])],
    controllers: [PreferencesController],
    providers: [PreferencesService],
})
export class PreferencesModule {}
