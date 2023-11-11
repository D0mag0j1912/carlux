import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
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

    @ApiCreatedResponse({
        status: 201,
        description: 'Server returns successful response',
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: 'Internal server error',
    })
    @ApiBadRequestResponse({
        status: 404,
        description: 'Bad request from the client',
    })
    @Post('phone-verification')
    sendSMS(@Body('phoneNumber') phoneNumber: string): HttpStatus {
        return this._authService.sendSMS(phoneNumber);
    }
}
