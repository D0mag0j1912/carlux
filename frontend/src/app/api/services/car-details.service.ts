/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { carDetailsControllerGetCarDetails } from '../fn/car-details/car-details-controller-get-car-details';
import { CarDetailsControllerGetCarDetails$Params } from '../fn/car-details/car-details-controller-get-car-details';
import { CarDetailsDto } from '../models/car-details-dto';

@Injectable({ providedIn: 'root' })
export class CarDetailsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `carDetailsControllerGetCarDetails()` */
  static readonly CarDetailsControllerGetCarDetailsPath = '/api/car/{carId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carDetailsControllerGetCarDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  carDetailsControllerGetCarDetails$Response(params: CarDetailsControllerGetCarDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<CarDetailsDto>> {
    return carDetailsControllerGetCarDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `carDetailsControllerGetCarDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carDetailsControllerGetCarDetails(params: CarDetailsControllerGetCarDetails$Params, context?: HttpContext): Observable<CarDetailsDto> {
    return this.carDetailsControllerGetCarDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<CarDetailsDto>): CarDetailsDto => r.body)
    );
  }

}
