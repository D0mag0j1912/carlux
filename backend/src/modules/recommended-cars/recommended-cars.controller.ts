import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
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
import { RecommendedCarsService } from './recommended-cars.service';
import { RecommendedCarsDto } from './models/recommended-cars.dto';

@ApiTags('Car list')
@Controller(`${BASE_URL}`)
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
    @Get('recommended-cars')
    async getRecommendedCars(
        @Query('page', ParseIntPipe) page: number,
        @Query('perPage', ParseIntPipe)
        perPage: number,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        return this._recommendedCarsService.getRecommendedCars(page, perPage);
    }
}
