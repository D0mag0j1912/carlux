import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { PreferencesService } from './preferences.service';
import { LanguageChangeDto } from './models/language-change';
import { PreferencesDto } from './models/preferences.dto';

@ApiTags('Preferences')
@Controller('api/preferences')
export class PreferencesController {
    constructor(private _preferencesService: PreferencesService) {}

    //--------------------- CHANGE LANGUAGE ------------------
    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        type: LanguageChangeDto,
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
        type: LanguageChangeDto,
        isArray: false,
        required: true,
    })
    @Post('language')
    async changeLanguage(@Body() body: LanguageChangeDto): Promise<LanguageChangeDto> {
        return this._preferencesService.saveLanguage(body.languageCode, body.userId);
    }

    @ApiOkResponse({
        type: PreferencesDto,
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
    async getPreferences(@Param('userId', ParseIntPipe) userId: number): Promise<PreferencesDto> {
        return this._preferencesService.getPreferences(userId);
    }
}
