import { Controller, Get } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { BasicInfoService } from './basic-info.service';
import { CarBrandDto } from './models/car-brand';

const BASIC_INFORMATION_FEATURE_KEY = 'basic-info';

@ApiTags('Basic car information')
@Controller(`${BASE_URL}${BASIC_INFORMATION_FEATURE_KEY}`)
export class BasicInfoController {
    constructor(private _basicInfoService: BasicInfoService) {}

    @ApiOkResponse({
        status: 200,
        type: CarBrandDto,
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
    @Get('brands')
    async getCarBrands(): Promise<CarBrandDto[]> {
        return this._basicInfoService.getCarBrands();
    }
}
