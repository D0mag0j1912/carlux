/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginationDto } from '../../models/pagination-dto';
import { RecommendedCarsDto } from '../../models/recommended-cars-dto';

export interface RecommendedCarsControllerGetRecommendedCars$Params {
  page: number;
  perPage: number;
}

export function recommendedCarsControllerGetRecommendedCars(http: HttpClient, rootUrl: string, params: RecommendedCarsControllerGetRecommendedCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, recommendedCarsControllerGetRecommendedCars.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('perPage', params.perPage, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginationDto & {
      'page'?: number;
      'perPage'?: number;
      'count'?: number;
      'results'?: Array<RecommendedCarsDto>;
      }>;
    })
  );
}

recommendedCarsControllerGetRecommendedCars.PATH = '/api/cars/recommended-cars';
