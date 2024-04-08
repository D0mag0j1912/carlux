import { Controller, Put, Query } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { GeneralResponseDto } from '../../models/general-response.dto';
import { FavoritesListService } from './favorites-list.service';
import { FavoriteListDto } from './models/favorite-list.dto';
import { FavoriteListQueryDto } from './models/favorite-list-query.dto';

const FAVOURITES_LIST_FEATURE_KEY = 'favorites-list';

@Controller(`${BASE_URL}${FAVOURITES_LIST_FEATURE_KEY}`)
export class FavouritesListController {
    constructor(private _favouritesListService: FavoritesListService) {}

    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        type: FavoriteListDto,
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
    async addToFavoritesList(
        @Query() favoriteListQuery: FavoriteListQueryDto,
    ): Promise<GeneralResponseDto> {
        return this._favouritesListService.saveToFavoriteList(favoriteListQuery.carId);
    }
}
