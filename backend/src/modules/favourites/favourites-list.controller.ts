import { Controller, Get, Put, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { GeneralResponseDto } from '../../models/general-response.dto';
import { FavouritesListService } from './favourites-list.service';
import { FavouriteListUpdateQueryDto } from './models/favourite-list-query.dto';
import { FavouriteListDto } from './models/favourite-list.dto';

const FAVOURITES_LIST_FEATURE_KEY = 'favourites-list';

@ApiTags('Favourite list')
@Controller(`${BASE_URL}${FAVOURITES_LIST_FEATURE_KEY}`)
export class FavouritesListController {
    constructor(private _favouritesListService: FavouritesListService) {}

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
    @Put()
    async addToFavouritesList(
        @Query() favouriteListUpdateQuery: FavouriteListUpdateQueryDto,
    ): Promise<GeneralResponseDto> {
        return this._favouritesListService.saveToFavouriteList(favouriteListUpdateQuery);
    }

    @ApiOkResponse({
        status: 200,
        type: FavouriteListDto,
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
    async getFavouriteList(): Promise<FavouriteListDto[]> {
        return this._favouritesListService.getFavouriteList();
    }
}
