import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @Post('phone-verification')
    sendSMS(@Body('phoneNumber') phoneNumber: string): HttpStatus {
        return this._authService.sendSMS(phoneNumber);
    }
}
