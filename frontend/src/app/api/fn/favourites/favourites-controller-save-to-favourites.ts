/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GeneralResponseDto } from '../../models/general-response-dto';

export interface FavouritesControllerSaveToFavourites$Params {
  carId: number;
  method: string;
}

export function favouritesControllerSaveToFavourites(http: HttpClient, rootUrl: string, params: FavouritesControllerSaveToFavourites$Params, context?: HttpContext): Observable<StrictHttpResponse<GeneralResponseDto>> {
  const rb = new RequestBuilder(rootUrl, favouritesControllerSaveToFavourites.PATH, 'put');
  if (params) {
    rb.path('carId', params.carId, {});
    rb.query('method', params.method, {});
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

favouritesControllerSaveToFavourites.PATH = '/api/favourites';
