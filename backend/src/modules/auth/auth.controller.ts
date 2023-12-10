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
import { AuthService } from './auth.service';
import { VerifyCodeDto } from './models/verify-code.dto';
import { StatusResponseDto } from './models/status-response.dto';
import { User } from './entity/user.entity';
import { EmailDto } from './models/email.dto';

@ApiTags('Authentication')
@Controller('api/auth')
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
        type: User,
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
        type: User,
        isArray: false,
    })
    @Post('register')
    async register(@Body() body: User): Promise<User> {
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
}
