import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
//TODO: Later
import { TwilioService } from 'nestjs-twilio';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MOCK_PHONE_VERIFICATION_CODE } from '../../mock/phone-verification-code';
import { StatusResponseDto } from './models/status-response.dto';
import { User } from './entity/user.entity';
import { LoginResponseDto } from './models/login-response.dto';
import { JwtPayloadDto } from './models/jwt-payload.dto';
import { EXPIRES_IN } from './constants/jwt.constants';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private _userRepository: Repository<User>,
        private _jwtService: JwtService, //private _twilioService: TwilioService,
    ) {}

    sendSMS(phoneNumber: string): StatusResponseDto {
        return {
            message: 'SMS sent successfully.',
            status: HttpStatus.CREATED,
        };
    }

    verifyCode(code: number): StatusResponseDto {
        if (MOCK_PHONE_VERIFICATION_CODE === code) {
            return {
                message: 'Valid verification code',
                status: HttpStatus.CREATED,
            };
        } else {
            return {
                message: 'Invalid verification code.',
                status: HttpStatus.UNAUTHORIZED,
            };
        }
    }

    async register(user: User): Promise<LoginResponseDto> {
        try {
            const newUser = this._userRepository.create({
                ...user,
                CreatedAt: new Date().toISOString(),
            });
            const savedUser: User = await this._userRepository.save(newUser);
            const jwtPayload: JwtPayloadDto = {
                userId: savedUser.Id,
                email: savedUser.Email,
            };
            const accessToken = this._jwtService.sign(jwtPayload);
            return {
                token: accessToken,
                expiresIn: EXPIRES_IN,
                userId: savedUser.Id,
            } as LoginResponseDto;
        } catch (error) {
            throw new InternalServerErrorException('Server error');
        }
    }

    async emailExists(email: string): Promise<boolean> {
        try {
            const user: User[] = await this._userRepository.find({
                select: {
                    Email: true,
                },
                where: {
                    Email: email,
                },
            });
            return !!user.length;
        } catch (error) {
            throw new InternalServerErrorException('Server error');
        }
    }
}
