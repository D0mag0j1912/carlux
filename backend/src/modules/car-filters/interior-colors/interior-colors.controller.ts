import { Controller, Get } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../../helpers/response-message';
import { InteriorColorsService } from './interior-colors.service';
import { InteriorColorsDto } from './models/interior-colors.dto';

const INTERIOR_COLORS_FEATURE_KEY = 'interior-colors';

@ApiTags('Interior colors')
@Controller(`${BASE_URL}${INTERIOR_COLORS_FEATURE_KEY}`)
export class InteriorColorsController {
    constructor(private _interiorColorsService: InteriorColorsService) {}

    @ApiOkResponse({
        status: 200,
        type: InteriorColorsDto,
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
    async getExteriorColors(): Promise<InteriorColorsDto[]> {
        return this._interiorColorsService.getInteriorColors();
    }
}
