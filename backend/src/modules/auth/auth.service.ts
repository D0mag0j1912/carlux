import { HttpStatus, Injectable } from '@nestjs/common';
//TODO: Later
import { TwilioService } from 'nestjs-twilio';
import { MOCK_PHONE_VERIFICATION_CODE } from '../../mock/phone-verification-code';

@Injectable()
export class AuthService {
    //constructor(private _twilioService: TwilioService) {}

    sendSMS(phoneNumber: string): HttpStatus {
        return HttpStatus.CREATED;
    }

    verifyCode(code: string): HttpStatus {
        return MOCK_PHONE_VERIFICATION_CODE === code ? HttpStatus.CREATED : HttpStatus.UNAUTHORIZED;
    }
}
