/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FavouritesDto } from '../../models/favourites-dto';

export interface FavouritesControllerGetFavouriteList$Params {
}

export function favouritesControllerGetFavouriteList(http: HttpClient, rootUrl: string, params?: FavouritesControllerGetFavouriteList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavouritesDto>>> {
  const rb = new RequestBuilder(rootUrl, favouritesControllerGetFavouriteList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FavouritesDto>>;
    })
  );
}

favouritesControllerGetFavouriteList.PATH = '/api/favourites';
