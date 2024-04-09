/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { FavoriteListDto } from '../models/favorite-list-dto';
import { favouritesListControllerAddToFavoritesList } from '../fn/favorite-list/favourites-list-controller-add-to-favorites-list';
import { FavouritesListControllerAddToFavoritesList$Params } from '../fn/favorite-list/favourites-list-controller-add-to-favorites-list';
import { favouritesListControllerGetFavoriteList } from '../fn/favorite-list/favourites-list-controller-get-favorite-list';
import { FavouritesListControllerGetFavoriteList$Params } from '../fn/favorite-list/favourites-list-controller-get-favorite-list';
import { GeneralResponseDto } from '../models/general-response-dto';

@Injectable({ providedIn: 'root' })
export class FavoriteListService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `favouritesListControllerGetFavoriteList()` */
  static readonly FavouritesListControllerGetFavoriteListPath = '/api/favorites-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesListControllerGetFavoriteList()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerGetFavoriteList$Response(params?: FavouritesListControllerGetFavoriteList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavoriteListDto>>> {
    return favouritesListControllerGetFavoriteList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesListControllerGetFavoriteList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerGetFavoriteList(params?: FavouritesListControllerGetFavoriteList$Params, context?: HttpContext): Observable<Array<FavoriteListDto>> {
    return this.favouritesListControllerGetFavoriteList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FavoriteListDto>>): Array<FavoriteListDto> => r.body)
    );
  }

  /** Path part for operation `favouritesListControllerAddToFavoritesList()` */
  static readonly FavouritesListControllerAddToFavoritesListPath = '/api/favorites-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesListControllerAddToFavoritesList()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerAddToFavoritesList$Response(params: FavouritesListControllerAddToFavoritesList$Params, context?: HttpContext): Observable<StrictHttpResponse<GeneralResponseDto>> {
    return favouritesListControllerAddToFavoritesList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesListControllerAddToFavoritesList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerAddToFavoritesList(params: FavouritesListControllerAddToFavoritesList$Params, context?: HttpContext): Observable<GeneralResponseDto> {
    return this.favouritesListControllerAddToFavoritesList$Response(params, context).pipe(
      map((r: StrictHttpResponse<GeneralResponseDto>): GeneralResponseDto => r.body)
    );
  }

}
