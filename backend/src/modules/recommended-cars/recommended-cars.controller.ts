import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { PaginationDocs } from '../../decorators/pagination-docs.decorator';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { PaginationDto } from '../../models/pagination.dto';
import { RecommendedCarsDto } from './models/recommended-cars.dto';
import { RecommendedCarsService } from './recommended-cars.service';

const RECOMMENDED_CARS_FEATURE_KEY = 'recommended-cars';

@ApiTags('Recommended cars list')
@Controller(`${BASE_URL}${RECOMMENDED_CARS_FEATURE_KEY}`)
export class RecommendedCarsController {
    constructor(private _recommendedCarsService: RecommendedCarsService) {}

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
    @Get()
    async getRecommendedCars(
        @Query('page', ParseIntPipe) page: number,
        @Query('perPage', ParseIntPipe)
        perPage: number,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        return this._recommendedCarsService.getRecommendedCars(page, perPage);
    }
}
