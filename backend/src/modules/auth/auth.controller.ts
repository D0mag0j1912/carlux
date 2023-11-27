import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { AuthService } from './auth.service';
import { VerifyCodeDto } from './models/verify-code.dto';
import { StatusResponseDto } from './models/status-response.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        type: StatusResponseDto,
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
    sendSMS(@Body('phoneNumber') phoneNumber: string): StatusResponseDto {
        return this._authService.sendSMS(phoneNumber);
    }

    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        type: StatusResponseDto,
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
    verifyCode(@Body() body: VerifyCodeDto): StatusResponseDto {
        return this._authService.verifyCode(body.code);
    }
}
