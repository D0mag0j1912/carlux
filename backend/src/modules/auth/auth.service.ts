import { HttpStatus, Injectable } from '@nestjs/common';
//TODO: Later
import { TwilioService } from 'nestjs-twilio';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MOCK_PHONE_VERIFICATION_CODE } from '../../mock/phone-verification-code';
import { StatusResponseDto } from './models/status-response.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
    //constructor(private _twilioService: TwilioService) {}

    constructor(@InjectRepository(User) private _userRepository: Repository<User>) {}

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

    async register(user: User): Promise<User> {
        const newUser = this._userRepository.create({
            ...user,
            CreatedAt: new Date().toISOString(),
        });
        return this._userRepository.save(newUser);
    }
}
