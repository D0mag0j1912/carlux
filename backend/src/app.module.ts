import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './modules/auth/entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { PreferenceEntity } from './modules/preferences/entity/preferences.entity';
import { LanguageEntity } from './modules/languages/entity/language.entity';
import { ProfileDetailsModule } from './modules/profile-details/profile-details.module';
import { CarEntity } from './shared/entities/car.entity';
import { WheelDriveTypeEntity } from './shared/entities/wheel-drive-types.entity';
import { BodyStyleEntity } from './shared/entities/body-style.entity';
import { RecommendedCarsModule } from './modules/recommended-cars/recommended-cars.module';
import { ImageEntity } from './shared/entities/image.entity';
import { CurrencyEntity } from './shared/entities/currency.entity';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { CarDetailsModule } from './modules/car-details/car-details.module';

const IMPORTS = [
    AuthModule,
    PreferencesModule,
    ProfileDetailsModule,
    RecommendedCarsModule,
    FavouritesModule,
    CarDetailsModule,
];

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
                    CurrencyEntity,
                ],
            }),
            inject: [ConfigService],
        }),
        ...IMPORTS,
    ],
})
export class AppModule {}
