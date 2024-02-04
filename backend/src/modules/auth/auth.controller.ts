import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { BASE_URL } from '../../constants/base-url';
import { UserDto } from '../profile-details/models/user.dto';
import { AuthService } from './auth.service';
import { VerifyCodeDto } from './models/verify-code.dto';
import { StatusResponseDto } from './models/status-response.dto';
import { EmailDto } from './models/email.dto';
import { LoginResponseDto } from './models/login-response.dto';

const AUTH_FEATURE_KEY = 'auth';

@ApiTags('Authentication')
@Controller(`${BASE_URL}${AUTH_FEATURE_KEY}`)
export class AuthController {
    constructor(private _authService: AuthService) {}

    //--------------------- SEND SMS ------------------
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

    //--------------- PHONE VERIFICATION ------------------
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

    //---------------- REGISTRATION ------------------
    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        type: LoginResponseDto,
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
        type: UserDto,
    })
    @Post('register')
    async register(@Body() body: UserDto): Promise<LoginResponseDto> {
        return this._authService.register(body);
    }

    //---------------- EMAIL EXISTS ------------------
    @ApiOkResponse({
        description: 'Response indicating that response was successfull',
        type: Boolean,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @Get('email-exists')
    async emailExists(@Query() query: EmailDto): Promise<boolean> {
        return this._authService.emailExists(query.email);
    }

    //---------------- SIGN IN ------------------
    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        type: LoginResponseDto,
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
        type: EmailDto,
        isArray: false,
    })
    @Post('sign-in')
    async signIn(@Body() body: EmailDto): Promise<LoginResponseDto> {
        return this._authService.signIn(body.email);
    }
}
