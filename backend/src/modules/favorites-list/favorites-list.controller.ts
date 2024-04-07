import { Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { RESPONSE_MESSAGE } from '../../helpers/response-message';
import { FavoritesListService } from './favorites-list.service';

const FAVOURITES_LIST_FEATURE_KEY = 'favourites-list';

@Controller(`${BASE_URL}${FAVOURITES_LIST_FEATURE_KEY}`)
export class FavouritesListController {
    constructor(private _favouritesListService: FavoritesListService) {}

    @ApiCreatedResponse({
        status: 201,
        description: RESPONSE_MESSAGE.CREATED,
        //TODO: Type
    })
    @ApiInternalServerErrorResponse({
        status: 500,
        description: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
    @ApiBadRequestResponse({
        status: 404,
        description: RESPONSE_MESSAGE.NOT_FOUND,
    })
    @Post('favourites-list')
    async saveToFavouritesList(): Promise<unknown> {
        return Promise.resolve();
    }
}
