/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { carsControllerGetCars } from '../fn/car-list/cars-controller-get-cars';
import { CarsControllerGetCars$Params } from '../fn/car-list/cars-controller-get-cars';
import { carsControllerGetCarsFiltersCount } from '../fn/car-list/cars-controller-get-cars-filters-count';
import { CarsControllerGetCarsFiltersCount$Params } from '../fn/car-list/cars-controller-get-cars-filters-count';
import { PaginationDto } from '../models/pagination-dto';
import { RecommendedCarsDto } from '../models/recommended-cars-dto';

@Injectable({ providedIn: 'root' })
export class CarListService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `carsControllerGetCars()` */
  static readonly CarsControllerGetCarsPath = '/api/cars';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carsControllerGetCars()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetCars$Response(params: CarsControllerGetCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}>> {
    return carsControllerGetCars(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `carsControllerGetCars$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetCars(params: CarsControllerGetCars$Params, context?: HttpContext): Observable<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}> {
    return this.carsControllerGetCars$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}>): PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
} => r.body)
    );
  }

  /** Path part for operation `carsControllerGetCarsFiltersCount()` */
  static readonly CarsControllerGetCarsFiltersCountPath = '/api/cars/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carsControllerGetCarsFiltersCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetCarsFiltersCount$Response(params: CarsControllerGetCarsFiltersCount$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return carsControllerGetCarsFiltersCount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `carsControllerGetCarsFiltersCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetCarsFiltersCount(params: CarsControllerGetCarsFiltersCount$Params, context?: HttpContext): Observable<number> {
    return this.carsControllerGetCarsFiltersCount$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
