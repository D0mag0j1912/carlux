/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CarDetailsDto } from '../../models/car-details-dto';

export interface RecommendedCarsControllerGetCarDetails$Params {
  carId: number;
}

export function recommendedCarsControllerGetCarDetails(http: HttpClient, rootUrl: string, params: RecommendedCarsControllerGetCarDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<CarDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, recommendedCarsControllerGetCarDetails.PATH, 'get');
  if (params) {
    rb.path('carId', params.carId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CarDetailsDto>;
    })
  );
}

recommendedCarsControllerGetCarDetails.PATH = '/api/cars/{carId}';
