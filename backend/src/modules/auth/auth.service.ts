import { HttpStatus, Injectable } from '@nestjs/common';
//TODO: Later
import { TwilioService } from 'nestjs-twilio';
import { MOCK_PHONE_VERIFICATION_CODE } from '../../mock/phone-verification-code';
import { VerifyCodeResponseDto } from './models/verify-code-response.dto';

@Injectable()
export class AuthService {
    //constructor(private _twilioService: TwilioService) {}

    sendSMS(phoneNumber: string): HttpStatus {
        return HttpStatus.CREATED;
    }

    verifyCode(code: number): VerifyCodeResponseDto {
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
