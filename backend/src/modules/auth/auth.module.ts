import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const SERVICES = [AuthService];

const CONTROLLERS = [AuthController];

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [...SERVICES],
    controllers: [...CONTROLLERS],
})
export class AuthModule {}
