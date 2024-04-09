import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { ProfileDetailsService } from './profile-details.service';
import { UserDto } from './models/user.dto';

const PROFILE_DETAILS_FEATURE_KEY = 'profile-details';

@ApiTags('User profile details')
@Controller(`${BASE_URL}${PROFILE_DETAILS_FEATURE_KEY}`)
export class ProfileDetailsController {
    constructor(private _profileDetailsService: ProfileDetailsService) {}

    @ApiOkResponse({
        type: UserDto,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @Get(':userId')
    async getProfileDetails(@Param('userId', ParseIntPipe) userId: number): Promise<UserDto> {
        return this._profileDetailsService.getProfileDetails(userId);
    }

    @ApiOkResponse({
        status: 200,
        description: RESPONSE_MESSAGE.SUCCESS,
        type: UserDto,
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
        isArray: false,
        required: true,
    })
    @Put()
    async saveProfileDetails(@Body() body: UserDto): Promise<UserDto> {
        return this._profileDetailsService.saveProfileDetails(body);
    }
}
