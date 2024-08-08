/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { CarDetailsDto } from '../../models/car-details-dto';

export interface CarDetailsControllerGetCarDetails$Params {
    carId: number;
}

export function carDetailsControllerGetCarDetails(
    http: HttpClient,
    rootUrl: string,
    params: CarDetailsControllerGetCarDetails$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<CarDetailsDto>> {
    const rb = new RequestBuilder(rootUrl, carDetailsControllerGetCarDetails.PATH, 'get');
    if (params) {
        rb.path('carId', params.carId, {});
    }

    return http
        .request(rb.build({ responseType: 'json', accept: 'application/json', context }))
        .pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<CarDetailsDto>;
            }),
        );
}

carDetailsControllerGetCarDetails.PATH = '/api/car/{carId}';
