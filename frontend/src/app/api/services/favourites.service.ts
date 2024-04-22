/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { favouritesControllerGetFavourites } from '../fn/favourites/favourites-controller-get-favourites';
import { FavouritesControllerGetFavourites$Params } from '../fn/favourites/favourites-controller-get-favourites';
import { favouritesControllerSaveToFavourites } from '../fn/favourites/favourites-controller-save-to-favourites';
import { FavouritesControllerSaveToFavourites$Params } from '../fn/favourites/favourites-controller-save-to-favourites';
import { FavouritesDto } from '../models/favourites-dto';
import { GeneralResponseDto } from '../models/general-response-dto';

@Injectable({ providedIn: 'root' })
export class FavouritesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `favouritesControllerGetFavourites()` */
  static readonly FavouritesControllerGetFavouritesPath = '/api/favourites';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesControllerGetFavourites()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerGetFavourites$Response(params?: FavouritesControllerGetFavourites$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavouritesDto>>> {
    return favouritesControllerGetFavourites(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesControllerGetFavourites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerGetFavourites(params?: FavouritesControllerGetFavourites$Params, context?: HttpContext): Observable<Array<FavouritesDto>> {
    return this.favouritesControllerGetFavourites$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FavouritesDto>>): Array<FavouritesDto> => r.body)
    );
  }

  /** Path part for operation `favouritesControllerSaveToFavourites()` */
  static readonly FavouritesControllerSaveToFavouritesPath = '/api/favourites';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favouritesControllerSaveToFavourites()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerSaveToFavourites$Response(params: FavouritesControllerSaveToFavourites$Params, context?: HttpContext): Observable<StrictHttpResponse<GeneralResponseDto>> {
    return favouritesControllerSaveToFavourites(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favouritesControllerSaveToFavourites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favouritesControllerSaveToFavourites(params: FavouritesControllerSaveToFavourites$Params, context?: HttpContext): Observable<GeneralResponseDto> {
    return this.favouritesControllerSaveToFavourites$Response(params, context).pipe(
      map((r: StrictHttpResponse<GeneralResponseDto>): GeneralResponseDto => r.body)
    );
  }

}
