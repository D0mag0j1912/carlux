import { Controller, Get } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../../helpers/response-message';
import { ExteriorColorsService } from './exterior-colors.service';
import { ExteriorColorDto } from './models/exterior-colors.dto';

const EXTERIOR_COLORS_FEATURE_KEY = 'exterior-colors';

@ApiTags('Exterior colors')
@Controller(`${BASE_URL}${EXTERIOR_COLORS_FEATURE_KEY}`)
export class ExteriorColorsController {
    constructor(private _exteriorColorsService: ExteriorColorsService) {}

    @ApiOkResponse({
        status: 200,
        type: ExteriorColorDto,
        isArray: true,
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
    async getExteriorColors(): Promise<ExteriorColorDto[]> {
        return this._exteriorColorsService.getExteriorColors();
    }
}
