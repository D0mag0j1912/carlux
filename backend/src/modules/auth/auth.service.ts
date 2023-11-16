import { HttpStatus, Injectable } from '@nestjs/common';
//TODO: Later
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class AuthService {
    //constructor(private _twilioService: TwilioService) {}

    sendSMS(phoneNumber: string): HttpStatus {
        return HttpStatus.CREATED;
    }
}
