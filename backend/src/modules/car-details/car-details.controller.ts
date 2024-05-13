import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { CarDetailsDto } from './models/car-details.dto';
import { CarDetailsService } from './car-details.service';

const CAR_DETAILS_FEATURE_KEY = 'car';

@ApiTags('Car details')
@Controller(`${BASE_URL}${CAR_DETAILS_FEATURE_KEY}`)
export class CarDetailsController {
    constructor(private _carDetailsService: CarDetailsService) {}

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
        return this._carDetailsService.getCarDetails(carId);
    }
}
