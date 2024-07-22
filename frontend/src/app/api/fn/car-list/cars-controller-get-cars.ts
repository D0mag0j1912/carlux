/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginationDto } from '../../models/pagination-dto';
import { RecommendedCarsDto } from '../../models/recommended-cars-dto';

export interface CarsControllerGetCars$Params {

/**
 * Page number
 */
  page: number;

/**
 * Car's per page
 */
  perPage: number;

/**
 * Car's brand ID
 */
  brandId?: number;

/**
 * Car's model ID
 */
  modelIds?: Array<number>;

/**
 * Car's body style
 */
  bodyStyles?: Array<'Convertible' | 'Coupe' | 'Sedan' | 'SUV' | 'Hatchback'>;

/**
 * Car's fuel type
 */
  fuelTypes?: Array<'Gasoline' | 'Diesel'>;

/**
 * Year registration FROM
 */
  yearRegistrationFrom?: number;

/**
 * Year registration TO
 */
  yearRegistrationTo?: number;

/**
 * Price FROM
 */
  priceFrom?: number;

/**
 * Price TO
 */
  priceTo?: number;

/**
 * Kilometers travelled FROM
 */
  kilometersTravelledFrom?: number;

/**
 * Kilometers travelled TO
 */
  kilometersTravelledTo?: number;

/**
 * Power unit
 */
  powerUnit?: 'PS' | 'KW';

/**
 * Power FROM
 */
  powerFrom?: number;

/**
 * Power TO
 */
  powerTo?: number;

/**
 * Type of transmission
 */
  transmissionTypes?: Array<'Automatic' | 'Manual'>;
}

export function carsControllerGetCars(http: HttpClient, rootUrl: string, params: CarsControllerGetCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationDto & {
'page'?: number;
'perPage'?: number;
'count'?: number;
'results'?: Array<RecommendedCarsDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, carsControllerGetCars.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('perPage', params.perPage, {});
    rb.query('brandId', params.brandId, {});
    rb.query('modelIds', params.modelIds, {});
    rb.query('bodyStyles', params.bodyStyles, {});
    rb.query('fuelTypes', params.fuelTypes, {});
    rb.query('yearRegistrationFrom', params.yearRegistrationFrom, {});
    rb.query('yearRegistrationTo', params.yearRegistrationTo, {});
    rb.query('priceFrom', params.priceFrom, {});
    rb.query('priceTo', params.priceTo, {});
    rb.query('kilometersTravelledFrom', params.kilometersTravelledFrom, {});
    rb.query('kilometersTravelledTo', params.kilometersTravelledTo, {});
    rb.query('powerUnit', params.powerUnit, {});
    rb.query('powerFrom', params.powerFrom, {});
    rb.query('powerTo', params.powerTo, {});
    rb.query('transmissionTypes', params.transmissionTypes, {});
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
