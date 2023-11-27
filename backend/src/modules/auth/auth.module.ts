import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { User } from './entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const SERVICES = [AuthService];

const CONTROLLERS = [AuthController];

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
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
})
export class AuthModule {}
