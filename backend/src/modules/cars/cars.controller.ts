import { Controller, Get, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { PaginationParamsDto } from '../../models/pagination-params.dto';
import { CarsService } from './cars.service';
import { RecommendedCarsDto } from './models/recommended-cars.dto';

const CARS_FEATURE_KEY = 'cars';

@ApiTags('Car list')
@Controller(`${BASE_URL}${CARS_FEATURE_KEY}`)
export class CarsController {
    constructor(private _carsService: CarsService) {}

    @ApiOkResponse({
        type: RecommendedCarsDto,
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
    @Get('recommended-cars')
    async getRecommendedCars(
        @Query() paginationParams: PaginationParamsDto,
    ): Promise<RecommendedCarsDto[]> {
        return this._carsService.getRecommendedCars(paginationParams);
    }
}
