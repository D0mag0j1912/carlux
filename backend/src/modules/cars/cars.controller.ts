import { Controller, Get, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { PaginationDocs } from '../../decorators/pagination-docs.decorator';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { PaginationDto } from '../../models/pagination.dto';
import { CarsService } from './cars.service';
import { CarFilterDto } from './models/car-filter.dto';
import { CarListDto } from './models/car-list.dto';

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
    @PaginationDocs(CarListDto)
    @ApiExtraModels(CarListDto, CarFilterDto)
    @Get()
    async getCars(@Query() query: CarFilterDto): Promise<PaginationDto<CarListDto>> {
        return this._carsService.filterCarList(query);
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
    @ApiExtraModels(CarFilterDto)
    @Get('count')
    async getCarsFiltersCount(@Query() query: CarFilterDto): Promise<number> {
        return this._carsService.getCarsFiltersCount(query);
    }
}
