/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginationDto } from '../models/pagination-dto';
import { recommendedCarsControllerGetRecommendedCars } from '../fn/recommended-cars-list/recommended-cars-controller-get-recommended-cars';
import { RecommendedCarsControllerGetRecommendedCars$Params } from '../fn/recommended-cars-list/recommended-cars-controller-get-recommended-cars';
import { RecommendedCarsDto } from '../models/recommended-cars-dto';

@Injectable({ providedIn: 'root' })
export class RecommendedCarsListService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `recommendedCarsControllerGetRecommendedCars()` */
  static readonly RecommendedCarsControllerGetRecommendedCarsPath = '/api/recommended-cars';

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

}
