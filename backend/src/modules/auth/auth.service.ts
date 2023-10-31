import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class AuthService {
    constructor(private _twilioService: TwilioService) {}

    async sendSMS(phoneNumber: string) {
        await this._twilioService.client.messages.create({
            body: '',
            from: '',
            to: '',
        });
    }
}
