/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecommendedCarsDto } from '../../models/recommended-cars-dto';

export interface CarsControllerGetRecommendedCars$Params {
}

export function carsControllerGetRecommendedCars(http: HttpClient, rootUrl: string, params?: CarsControllerGetRecommendedCars$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RecommendedCarsDto>>> {
  const rb = new RequestBuilder(rootUrl, carsControllerGetRecommendedCars.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<RecommendedCarsDto>>;
    })
  );
}

carsControllerGetRecommendedCars.PATH = '/api/cars/recommended-cars';
