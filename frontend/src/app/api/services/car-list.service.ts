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
import { PaginationDto } from '../models/pagination-dto';
import { recommendedCarsControllerGetCarDetails } from '../fn/car-list/recommended-cars-controller-get-car-details';
import { RecommendedCarsControllerGetCarDetails$Params } from '../fn/car-list/recommended-cars-controller-get-car-details';
import { recommendedCarsControllerGetRecommendedCars } from '../fn/car-list/recommended-cars-controller-get-recommended-cars';
import { RecommendedCarsControllerGetRecommendedCars$Params } from '../fn/car-list/recommended-cars-controller-get-recommended-cars';
import { RecommendedCarsDto } from '../models/recommended-cars-dto';

@Injectable({ providedIn: 'root' })
export class CarListService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `recommendedCarsControllerGetRecommendedCars()` */
  static readonly RecommendedCarsControllerGetRecommendedCarsPath = '/api/cars/recommended-cars';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recommendedCarsControllerGetRecommendedCars()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendedCarsControllerGetRecommendedCars$Response(params: RecommendedCarsControllerGetRecommendedCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}>> {
    return recommendedCarsControllerGetRecommendedCars(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recommendedCarsControllerGetRecommendedCars$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendedCarsControllerGetRecommendedCars(params: RecommendedCarsControllerGetRecommendedCars$Params, context?: HttpContext): Observable<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}> {
    return this.recommendedCarsControllerGetRecommendedCars$Response(params, context).pipe(
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

  /** Path part for operation `recommendedCarsControllerGetCarDetails()` */
  static readonly RecommendedCarsControllerGetCarDetailsPath = '/api/cars/{carId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recommendedCarsControllerGetCarDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendedCarsControllerGetCarDetails$Response(params: RecommendedCarsControllerGetCarDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<CarDetailsDto>> {
    return recommendedCarsControllerGetCarDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recommendedCarsControllerGetCarDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendedCarsControllerGetCarDetails(params: RecommendedCarsControllerGetCarDetails$Params, context?: HttpContext): Observable<CarDetailsDto> {
    return this.recommendedCarsControllerGetCarDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<CarDetailsDto>): CarDetailsDto => r.body)
    );
  }

}
