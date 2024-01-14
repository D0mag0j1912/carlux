import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../middleware/jwt.strategy';
import { Language } from '../languages/entity/language.entity';
import { Preference } from '../preferences/entity/preferences.entity';
import { User } from './entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EXPIRES_IN, JWT_TOKEN } from './constants/jwt.constants';

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
        TypeOrmModule.forFeature([User, Preference, Language]),
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
