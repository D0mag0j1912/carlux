import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwilioModule } from 'nestjs-twilio';
import { JwtStrategy } from '../../middleware/jwt.strategy';
import { LanguageEntity } from '../languages/entity/language.entity';
import { PreferenceEntity } from '../preferences/entity/preferences.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EXPIRES_IN, JWT_TOKEN } from './constants/jwt.constants';
import { UserEntity } from './entity/user.entity';

const SERVICES = [AuthService, JwtStrategy];

const CONTROLLERS = [AuthController];

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: JWT_TOKEN,
            signOptions: {
                expiresIn: EXPIRES_IN,
            },
        }),
        TypeOrmModule.forFeature([UserEntity, PreferenceEntity, LanguageEntity]),
        TwilioModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                accountSid: configService.get('TWILIO_ACCOUNT_SID'),
                authToken: configService.get('TWILIO_AUTH_TOKEN'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [...SERVICES],
    controllers: [...CONTROLLERS],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
