/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { StrictHttpResponse } from '../strict-http-response';

import {
    FavouritesControllerGetFavourites$Params,
    favouritesControllerGetFavourites,
} from '../fn/favourites/favourites-controller-get-favourites';
import {
    FavouritesControllerHandleFavouritesActions$Params,
    favouritesControllerHandleFavouritesActions,
} from '../fn/favourites/favourites-controller-handle-favourites-actions';
import { FavouritesDto } from '../models/favourites-dto';
import { GeneralResponseDto } from '../models/general-response-dto';

@Injectable({ providedIn: 'root' })
export class FavouritesService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `favouritesControllerHandleFavouritesActions()` */
    static readonly FavouritesControllerHandleFavouritesActionsPath = '/api/favourites/{carId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `favouritesControllerHandleFavouritesActions()` instead.
     *
     * This method doesn't expect any request body.
     */
    favouritesControllerHandleFavouritesActions$Response(
        params: FavouritesControllerHandleFavouritesActions$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<GeneralResponseDto>> {
        return favouritesControllerHandleFavouritesActions(
            this.http,
            this.rootUrl,
            params,
            context,
        );
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `favouritesControllerHandleFavouritesActions$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    favouritesControllerHandleFavouritesActions(
        params: FavouritesControllerHandleFavouritesActions$Params,
        context?: HttpContext,
    ): Observable<GeneralResponseDto> {
        return this.favouritesControllerHandleFavouritesActions$Response(params, context).pipe(
            map((r: StrictHttpResponse<GeneralResponseDto>): GeneralResponseDto => r.body),
        );
    }

    /** Path part for operation `favouritesControllerGetFavourites()` */
    static readonly FavouritesControllerGetFavouritesPath = '/api/favourites';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `favouritesControllerGetFavourites()` instead.
     *
     * This method doesn't expect any request body.
     */
    favouritesControllerGetFavourites$Response(
        params?: FavouritesControllerGetFavourites$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<FavouritesDto>>> {
        return favouritesControllerGetFavourites(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `favouritesControllerGetFavourites$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    favouritesControllerGetFavourites(
        params?: FavouritesControllerGetFavourites$Params,
        context?: HttpContext,
    ): Observable<Array<FavouritesDto>> {
        return this.favouritesControllerGetFavourites$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<FavouritesDto>>): Array<FavouritesDto> => r.body),
        );
    }
}
