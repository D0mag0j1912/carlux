/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { StrictHttpResponse } from '../strict-http-response';

import {
    BasicInfoControllerGetCarBrands$Params,
    basicInfoControllerGetCarBrands,
} from '../fn/basic-car-information/basic-info-controller-get-car-brands';
import {
    BasicInfoControllerGetCarModels$Params,
    basicInfoControllerGetCarModels,
} from '../fn/basic-car-information/basic-info-controller-get-car-models';
import { CarBrandDto } from '../models/car-brand-dto';
import { CarModelDto } from '../models/car-model-dto';

@Injectable({ providedIn: 'root' })
export class BasicCarInformationService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `basicInfoControllerGetCarBrands()` */
    static readonly BasicInfoControllerGetCarBrandsPath = '/api/basic-info/brands';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `basicInfoControllerGetCarBrands()` instead.
     *
     * This method doesn't expect any request body.
     */
    basicInfoControllerGetCarBrands$Response(
        params?: BasicInfoControllerGetCarBrands$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<CarBrandDto>>> {
        return basicInfoControllerGetCarBrands(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `basicInfoControllerGetCarBrands$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    basicInfoControllerGetCarBrands(
        params?: BasicInfoControllerGetCarBrands$Params,
        context?: HttpContext,
    ): Observable<Array<CarBrandDto>> {
        return this.basicInfoControllerGetCarBrands$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<CarBrandDto>>): Array<CarBrandDto> => r.body),
        );
    }

    /** Path part for operation `basicInfoControllerGetCarModels()` */
    static readonly BasicInfoControllerGetCarModelsPath = '/api/basic-info/{brandId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `basicInfoControllerGetCarModels()` instead.
     *
     * This method doesn't expect any request body.
     */
    basicInfoControllerGetCarModels$Response(
        params: BasicInfoControllerGetCarModels$Params,
        context?: HttpContext,
    ): Observable<StrictHttpResponse<Array<CarModelDto>>> {
        return basicInfoControllerGetCarModels(this.http, this.rootUrl, params, context);
    }

    /**
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `basicInfoControllerGetCarModels$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    basicInfoControllerGetCarModels(
        params: BasicInfoControllerGetCarModels$Params,
        context?: HttpContext,
    ): Observable<Array<CarModelDto>> {
        return this.basicInfoControllerGetCarModels$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<CarModelDto>>): Array<CarModelDto> => r.body),
        );
    }
}
