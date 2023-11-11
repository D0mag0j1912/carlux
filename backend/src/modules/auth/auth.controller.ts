import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @ApiCreatedResponse()
    @ApiInternalServerErrorResponse({
        status: 500,
        description: 'Internal server error',
    })
    @ApiBadRequestResponse({
        status: 404,
        description: 'Bad request from the client',
    })
    @Post('phone-verification')
    async sendSMS(@Body('phoneNumber') phoneNumber: string) {
        await this._authService.sendSMS(phoneNumber);
    }
}
