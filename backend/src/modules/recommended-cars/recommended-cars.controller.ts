import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiTags,
    ApiOkResponse,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { PaginationDto } from '../../models/pagination.dto';
import { PaginationDocs } from '../../decorators/pagination-docs.decorator';
import { RecommendedCarsService } from './recommended-cars.service';
import { RecommendedCarsDto } from './models/recommended-cars.dto';
import { CarDetailsDto } from './models/car-details.dto';

const CARS_FEATURE_KEY = 'cars';

@ApiTags('Car list')
@Controller(`${BASE_URL}${CARS_FEATURE_KEY}`)
export class RecommendedCarsController {
    constructor(private _carsService: RecommendedCarsService) {}

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
        return this._carsService.getRecommendedCars(page, perPage);
    }

    @ApiOkResponse({
        type: CarDetailsDto,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @Get(':carId')
    async getCarDetails(@Param('carId', ParseIntPipe) carId: number): Promise<CarDetailsDto> {
        return this._carsService.getCarDetails(carId);
    }
}
