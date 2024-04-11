/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { FavouriteListDto } from '../models/favourite-list-dto';
import { favouritesListControllerAddToFavouritesList } from '../fn/favourite-list/favourites-list-controller-add-to-favourites-list';
import { FavouritesListControllerAddToFavouritesList$Params } from '../fn/favourite-list/favourites-list-controller-add-to-favourites-list';
import { favouritesListControllerGetFavouriteList } from '../fn/favourite-list/favourites-list-controller-get-favourite-list';
import { FavouritesListControllerGetFavouriteList$Params } from '../fn/favourite-list/favourites-list-controller-get-favourite-list';
import { GeneralResponseDto } from '../models/general-response-dto';

@Injectable({ providedIn: 'root' })
export class FavouriteListService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `favouritesListControllerGetFavouriteList()` */
  static readonly FavouritesListControllerGetFavouriteListPath = '/api/favourites-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesListControllerGetFavouriteList()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerGetFavouriteList$Response(params?: FavouritesListControllerGetFavouriteList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavouriteListDto>>> {
    return favouritesListControllerGetFavouriteList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesListControllerGetFavouriteList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerGetFavouriteList(params?: FavouritesListControllerGetFavouriteList$Params, context?: HttpContext): Observable<Array<FavouriteListDto>> {
    return this.favouritesListControllerGetFavouriteList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FavouriteListDto>>): Array<FavouriteListDto> => r.body)
    );
  }

  /** Path part for operation `favouritesListControllerAddToFavouritesList()` */
  static readonly FavouritesListControllerAddToFavouritesListPath = '/api/favourites-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesListControllerAddToFavouritesList()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerAddToFavouritesList$Response(params: FavouritesListControllerAddToFavouritesList$Params, context?: HttpContext): Observable<StrictHttpResponse<GeneralResponseDto>> {
    return favouritesListControllerAddToFavouritesList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesListControllerAddToFavouritesList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesListControllerAddToFavouritesList(params: FavouritesListControllerAddToFavouritesList$Params, context?: HttpContext): Observable<GeneralResponseDto> {
    return this.favouritesListControllerAddToFavouritesList$Response(params, context).pipe(
      map((r: StrictHttpResponse<GeneralResponseDto>): GeneralResponseDto => r.body)
    );
  }

}
