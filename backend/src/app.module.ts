import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/auth/entity/user.entity';
import { CarDetailsModule } from './modules/car-details/car-details.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { LanguageEntity } from './modules/languages/entity/language.entity';
import { PreferenceEntity } from './modules/preferences/entity/preferences.entity';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { ProfileDetailsModule } from './modules/profile-details/profile-details.module';
import { RecommendedCarsModule } from './modules/recommended-cars/recommended-cars.module';
import { BasicInfoModule } from './shared/basic-info/basic-info.module';
import { CarBrandEntity } from './shared/entities/car-brand.entity';
import { CarModelEntity } from './shared/entities/car-model.entity';
import { CarEntity } from './shared/entities/car.entity';
import { CurrencyEntity } from './shared/entities/currency.entity';
import { ImageEntity } from './shared/entities/image.entity';
import { WheelDriveTypeEntity } from './shared/entities/wheel-drive-types.entity';

const IMPORTS = [
    AuthModule,
    PreferencesModule,
    ProfileDetailsModule,
    RecommendedCarsModule,
    FavouritesModule,
    CarDetailsModule,
    BasicInfoModule,
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
                    ImageEntity,
                    CurrencyEntity,
                    CarBrandEntity,
                    CarModelEntity,
                ],
            }),
            inject: [ConfigService],
        }),
        ...IMPORTS,
    ],
})
export class AppModule {}
