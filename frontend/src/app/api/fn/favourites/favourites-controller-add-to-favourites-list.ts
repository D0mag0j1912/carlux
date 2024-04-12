/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GeneralResponseDto } from '../../models/general-response-dto';

export interface FavouritesControllerAddToFavouritesList$Params {

/**
 * Car ID
 */
  carId: number;
}

export function favouritesControllerAddToFavouritesList(http: HttpClient, rootUrl: string, params: FavouritesControllerAddToFavouritesList$Params, context?: HttpContext): Observable<StrictHttpResponse<GeneralResponseDto>> {
  const rb = new RequestBuilder(rootUrl, favouritesControllerAddToFavouritesList.PATH, 'put');
  if (params) {
    rb.query('carId', params.carId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GeneralResponseDto>;
    })
  );
}

favouritesControllerAddToFavouritesList.PATH = '/api/favourites';
