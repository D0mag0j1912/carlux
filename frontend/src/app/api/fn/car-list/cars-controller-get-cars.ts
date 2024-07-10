/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CarFilterDto } from '../../models/car-filter-dto';
import { PaginationDto } from '../../models/pagination-dto';
import { RecommendedCarsDto } from '../../models/recommended-cars-dto';

export interface CarsControllerGetCars$Params {
  carFilterOptions: CarFilterDto;
}

export function carsControllerGetCars(http: HttpClient, rootUrl: string, params: CarsControllerGetCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, carsControllerGetCars.PATH, 'get');
  if (params) {
    rb.query('carFilterOptions', params.carFilterOptions, {});
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

carsControllerGetCars.PATH = '/api/cars';
