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
import { LanguageCode } from '../languages/enums/language-code';
import { PreferencesService } from './preferences.service';
import { LanguageChangeDto } from './models/language-change';
import { GetPreferencesDto } from './models/get-language.dto';
import { PreferencesDto } from './models/preferences.dto';

@ApiTags('Preferences')
@Controller('api/preferences')
export class PreferencesController {
    constructor(private _preferencesService: PreferencesService) {}

    //--------------------- CHANGE LANGUAGE ------------------
    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        type: String,
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
    async changeLanguage(@Body() body: LanguageChangeDto): Promise<LanguageCode> {
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
    @Get()
    async getLanguage(@Query() data: GetPreferencesDto): Promise<PreferencesDto> {
        return this._preferencesService.getPreferences(data.userId);
    }
}
