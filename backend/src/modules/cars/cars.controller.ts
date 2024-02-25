import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { PaginationDto } from '../../models/pagination.dto';
import { PaginationDocs } from '../../decorators/pagination-docs.decorator';
import { ITEMS_PER_PAGE } from '../../constants/items-per-page';
import { CarsService } from './cars.service';
import { RecommendedCarsDto } from './models/recommended-cars.dto';

const CARS_FEATURE_KEY = 'cars';

@ApiTags('Car list')
@Controller(`${BASE_URL}${CARS_FEATURE_KEY}`)
export class CarsController {
    constructor(private _carsService: CarsService) {}

    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @PaginationDocs(RecommendedCarsDto)
    @ApiExtraModels(RecommendedCarsDto)
    @Get('recommended-cars')
    async getRecommendedCars(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('perPage', new DefaultValuePipe(ITEMS_PER_PAGE), ParseIntPipe)
        perPage = ITEMS_PER_PAGE,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        return this._carsService.getRecommendedCars(page, perPage);
    }
}
