import { Controller, Get, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { PaginationDocs } from '../../decorators/pagination-docs.decorator';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { PaginationDto } from '../../models/pagination.dto';
import { RecommendedCarsDto } from '../recommended-cars/models/recommended-cars.dto';
import { CarsService } from './cars.service';
import { CarFilterDto } from './models/car-filter.dto';

const CARS_FEATURE_KEY = 'cars';

@ApiExtraModels(CarFilterDto)
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
    @Get()
    @ApiQuery({
        name: 'carFilterOptions',
        required: true,
        type: 'object',
        schema: {
            $ref: getSchemaPath(CarFilterDto),
        },
    })
    async getCars(
        @Query('carFilterOptions') query: CarFilterDto,
    ): Promise<PaginationDto<RecommendedCarsDto>> {
        return this._carsService.filterRecommendedCars(query);
    }

    @ApiOkResponse({
        description:
            'Response indicating how many car results there are for the specific query params',
        type: Number,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @Get('count')
    @ApiQuery({
        name: 'carFilterOptions',
        required: true,
        type: 'object',
        schema: {
            $ref: getSchemaPath(CarFilterDto),
        },
    })
    async getCarsFiltersCount(@Query('carFilterOptions') query: CarFilterDto): Promise<number> {
        return this._carsService.getCarsFiltersCount(query);
    }
}
