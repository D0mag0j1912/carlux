import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
//TODO: Later
import { TwilioService } from 'nestjs-twilio';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MOCK_PHONE_VERIFICATION_CODE } from '../../mock/phone-verification-code';
import { PreferenceEntity } from '../preferences/entity/preferences.entity';
import { LanguageEntity } from '../languages/entity/language.entity';
import { UserDto } from '../profile-details/models/user.dto';
import { StatusResponseDto } from './models/status-response.dto';
import { UserEntity } from './entity/user.entity';
import { LoginResponseDto } from './models/login-response.dto';
import { JwtPayloadDto } from './models/jwt-payload.dto';
import { EXPIRES_IN } from './constants/jwt.constants';
import { INITIAL_LANGUAGE } from './constants/initial-language';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>,
        @InjectRepository(PreferenceEntity)
        private _preferencesRepository: Repository<PreferenceEntity>,
        @InjectRepository(LanguageEntity) private _languagesRepository: Repository<LanguageEntity>,
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

    async register(user: UserDto): Promise<LoginResponseDto> {
        try {
            //Save User
            const userEntity: Partial<UserEntity> = {
                BirthDate: user.birthDate,
                Email: user.email,
                FirstName: user.firstName,
                LastName: user.lastName,
            };
            const newUser = this._userRepository.create({
                ...userEntity,
                CreatedAt: new Date().toISOString(),
            });
            const savedUser: UserEntity = await this._userRepository.save(newUser);
            //Save Preference
            const language: LanguageEntity[] = await this._languagesRepository.find({
                select: {
                    Id: true,
                },
                where: {
                    LanguageCode: INITIAL_LANGUAGE,
                },
            });
            const newPreference: PreferenceEntity = {
                UserId: savedUser.Id,
                LanguageId: language[0].Id,
            };
            await this._preferencesRepository.save(newPreference);
            //Generate token
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
            throw new InternalServerErrorException();
        }
    }

    async emailExists(email: string): Promise<boolean> {
        try {
            const user: UserEntity[] = await this._userRepository.find({
                select: {
                    Email: true,
                },
                where: {
                    Email: email,
                },
            });
            return !!user.length;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async signIn(email: string): Promise<LoginResponseDto> {
        try {
            const user: UserEntity[] = await this._userRepository.find({
                select: {
                    Id: true,
                    Email: true,
                },
                where: {
                    Email: email,
                },
            });
            if (!user.length) {
                throw new InternalServerErrorException();
            }
            const foundUser = user[0];
            const jwtPayload: JwtPayloadDto = {
                userId: foundUser.Id,
                email: foundUser.Email,
            };
            const accessToken = this._jwtService.sign(jwtPayload);
            return {
                token: accessToken,
                expiresIn: EXPIRES_IN,
                userId: foundUser.Id,
            } as LoginResponseDto;
        } catch (error: unknown) {
            throw new InternalServerErrorException();
        }
    }
}
