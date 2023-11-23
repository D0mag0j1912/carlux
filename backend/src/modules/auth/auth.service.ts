import { HttpStatus, Injectable } from '@nestjs/common';
//TODO: Later
import { TwilioService } from 'nestjs-twilio';
import { MOCK_PHONE_VERIFICATION_CODE } from '../../mock/phone-verification-code';
import { StatusResponseDto } from './models/status-response.dto';

@Injectable()
export class AuthService {
    //constructor(private _twilioService: TwilioService) {}

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
}
