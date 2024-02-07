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
import { WheelDriveTypeEntity } from './modules/cars/entity/wheel-drive-types.entity';
import { BodyStyleEntity } from './modules/cars/entity/body-style.entity';
import { CarsModule } from './modules/cars/cars.module';
import { ImageEntity } from './modules/cars/entity/image.entity';

const IMPORTS = [AuthModule, PreferencesModule, ProfileDetailsModule, CarsModule];

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
                    ImageEntity,
                ],
            }),
            inject: [ConfigService],
        }),
        ...IMPORTS,
    ],
})
export class AppModule {}
