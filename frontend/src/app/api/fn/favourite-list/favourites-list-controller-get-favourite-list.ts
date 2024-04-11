/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FavouriteListDto } from '../../models/favourite-list-dto';

export interface FavouritesListControllerGetFavouriteList$Params {
}

export function favouritesListControllerGetFavouriteList(http: HttpClient, rootUrl: string, params?: FavouritesListControllerGetFavouriteList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavouriteListDto>>> {
  const rb = new RequestBuilder(rootUrl, favouritesListControllerGetFavouriteList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FavouriteListDto>>;
    })
  );
}

favouritesListControllerGetFavouriteList.PATH = '/api/favourites-list';
