/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FavoriteListDto } from '../../models/favorite-list-dto';

export interface FavouritesListControllerGetFavoriteList$Params {
}

export function favouritesListControllerGetFavoriteList(http: HttpClient, rootUrl: string, params?: FavouritesListControllerGetFavoriteList$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavoriteListDto>>> {
  const rb = new RequestBuilder(rootUrl, favouritesListControllerGetFavoriteList.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FavoriteListDto>>;
    })
  );
}

favouritesListControllerGetFavoriteList.PATH = '/api/favorites-list';
