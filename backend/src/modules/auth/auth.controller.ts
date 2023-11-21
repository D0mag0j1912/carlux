import { Body, Controller, HttpStatus, ParseIntPipe, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { VerifyCodeDto } from './models/verify-code';

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
    @ApiBody({
        type: String,
        isArray: false,
    })
    @Post('send-sms')
    sendSMS(@Body('phoneNumber') phoneNumber: string): HttpStatus {
        return this._authService.sendSMS(phoneNumber);
    }

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
    @ApiBody({
        type: VerifyCodeDto,
        isArray: false,
    })
    @Post('phone-verification')
    verifyCode(@Body(ParseIntPipe) body: VerifyCodeDto): HttpStatus {
        return this._authService.verifyCode(body.code);
    }
}
