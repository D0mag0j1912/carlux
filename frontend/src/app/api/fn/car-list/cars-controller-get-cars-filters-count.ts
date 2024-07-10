/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CarFilterDto } from '../../models/car-filter-dto';

export interface CarsControllerGetCarsFiltersCount$Params {
  carFilterOptions: CarFilterDto;
}

export function carsControllerGetCarsFiltersCount(http: HttpClient, rootUrl: string, params: CarsControllerGetCarsFiltersCount$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, carsControllerGetCarsFiltersCount.PATH, 'get');
  if (params) {
    rb.query('carFilterOptions', params.carFilterOptions, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

carsControllerGetCarsFiltersCount.PATH = '/api/cars/count';
