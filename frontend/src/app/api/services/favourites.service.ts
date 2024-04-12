/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { favouritesControllerAddToFavouritesList } from '../fn/favourites/favourites-controller-add-to-favourites-list';
import { FavouritesControllerAddToFavouritesList$Params } from '../fn/favourites/favourites-controller-add-to-favourites-list';
import { favouritesControllerGetFavouriteList } from '../fn/favourites/favourites-controller-get-favourite-list';
import { FavouritesControllerGetFavouriteList$Params } from '../fn/favourites/favourites-controller-get-favourite-list';
import { FavouritesDto } from '../models/favourites-dto';
import { GeneralResponseDto } from '../models/general-response-dto';

@Injectable({ providedIn: 'root' })
export class FavouritesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `favouritesControllerGetFavouriteList()` */
  static readonly FavouritesControllerGetFavouriteListPath = '/api/favourites';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesControllerGetFavouriteList()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerGetFavouriteList$Response(params?: FavouritesControllerGetFavouriteList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavouritesDto>>> {
    return favouritesControllerGetFavouriteList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesControllerGetFavouriteList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerGetFavouriteList(params?: FavouritesControllerGetFavouriteList$Params, context?: HttpContext): Observable<Array<FavouritesDto>> {
    return this.favouritesControllerGetFavouriteList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FavouritesDto>>): Array<FavouritesDto> => r.body)
    );
  }

  /** Path part for operation `favouritesControllerAddToFavouritesList()` */
  static readonly FavouritesControllerAddToFavouritesListPath = '/api/favourites';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesControllerAddToFavouritesList()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerAddToFavouritesList$Response(params: FavouritesControllerAddToFavouritesList$Params, context?: HttpContext): Observable<StrictHttpResponse<GeneralResponseDto>> {
    return favouritesControllerAddToFavouritesList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesControllerAddToFavouritesList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerAddToFavouritesList(params: FavouritesControllerAddToFavouritesList$Params, context?: HttpContext): Observable<GeneralResponseDto> {
    return this.favouritesControllerAddToFavouritesList$Response(params, context).pipe(
      map((r: StrictHttpResponse<GeneralResponseDto>): GeneralResponseDto => r.body)
    );
  }

}
