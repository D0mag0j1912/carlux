import { Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { GeneralResponseDto } from '../../models/general-response.dto';
import { FavouritesService } from './favourites.service';
import { FavouritesDto } from './models/favourites.dto';
import { HandleFavourites } from './constants/handle-favourites';

const FAVOURITES_LIST_FEATURE_KEY = 'favourites';

@ApiTags('Favourites')
@Controller(`${BASE_URL}${FAVOURITES_LIST_FEATURE_KEY}`)
export class FavouritesController {
    constructor(private _favouritesService: FavouritesService) {}

    @ApiOkResponse({
        status: 200,
        description: RESPONSE_MESSAGE.SUCCESS,
        type: GeneralResponseDto,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @Put(':carId')
    async handleFavouritesActions(
        @Param('carId', ParseIntPipe) carId: number,
        @Query('method') method: HandleFavourites,
    ): Promise<GeneralResponseDto> {
        return this._favouritesService.handleFavouritesActions(carId, method);
    }

    @ApiOkResponse({
        status: 200,
        type: FavouritesDto,
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
    async getFavourites(): Promise<FavouritesDto[]> {
        return this._favouritesService.getFavourites();
    }
}
