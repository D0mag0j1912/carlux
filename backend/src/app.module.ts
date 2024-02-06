import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './modules/auth/entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { PreferenceEntity } from './modules/preferences/entity/preferences.entity';
import { LanguageEntity } from './modules/languages/entity/language.entity';
import { ProfileDetailsModule } from './modules/profile-details/profile-details.module';
import { CarEntity } from './modules/cars/entity/car.entity';
import { WheelDriveTypeEntity } from './modules/wheel-drive-types/entity/wheel-drive-types.entity';
import { BodyStyleEntity } from './modules/body-styles/entity/body-style.entity';

const IMPORTS = [AuthModule, PreferencesModule, ProfileDetailsModule];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DATABASE_HOST'),
                port: configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USER'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                entities: [
                    UserEntity,
                    PreferenceEntity,
                    LanguageEntity,
                    CarEntity,
                    WheelDriveTypeEntity,
                    BodyStyleEntity,
                ],
            }),
            inject: [ConfigService],
        }),
        ...IMPORTS,
    ],
})
export class AppModule {}
