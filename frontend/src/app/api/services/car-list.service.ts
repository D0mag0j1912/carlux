/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CarDetailsDto } from '../models/car-details-dto';
import { carsControllerGetCarDetails } from '../fn/car-list/cars-controller-get-car-details';
import { CarsControllerGetCarDetails$Params } from '../fn/car-list/cars-controller-get-car-details';
import { carsControllerGetRecommendedCars } from '../fn/car-list/cars-controller-get-recommended-cars';
import { CarsControllerGetRecommendedCars$Params } from '../fn/car-list/cars-controller-get-recommended-cars';
import { PaginationDto } from '../models/pagination-dto';
import { RecommendedCarsDto } from '../models/recommended-cars-dto';

@Injectable({ providedIn: 'root' })
export class CarListService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `carsControllerGetRecommendedCars()` */
  static readonly CarsControllerGetRecommendedCarsPath = '/api/cars/recommended-cars';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carsControllerGetRecommendedCars()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetRecommendedCars$Response(params: CarsControllerGetRecommendedCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}>> {
    return carsControllerGetRecommendedCars(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `carsControllerGetRecommendedCars$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetRecommendedCars(params: CarsControllerGetRecommendedCars$Params, context?: HttpContext): Observable<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}> {
    return this.carsControllerGetRecommendedCars$Response(params, context).pipe(
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

  /** Path part for operation `carsControllerGetCarDetails()` */
  static readonly CarsControllerGetCarDetailsPath = '/api/cars/{carId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carsControllerGetCarDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetCarDetails$Response(params: CarsControllerGetCarDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<CarDetailsDto>> {
    return carsControllerGetCarDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `carsControllerGetCarDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carsControllerGetCarDetails(params: CarsControllerGetCarDetails$Params, context?: HttpContext): Observable<CarDetailsDto> {
    return this.carsControllerGetCarDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<CarDetailsDto>): CarDetailsDto => r.body)
    );
  }

}
