import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './modules/auth/entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { Preference } from './modules/preferences/entity/preferences.entity';
import { Language } from './modules/languages/entity/language.entity';

const IMPORTS = [AuthModule, PreferencesModule];

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
                entities: [User, Preference, Language],
            }),
            inject: [ConfigService],
        }),
        ...IMPORTS,
    ],
})
export class AppModule {}
