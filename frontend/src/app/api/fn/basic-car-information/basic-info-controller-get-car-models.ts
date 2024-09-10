/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CarModelDto } from '../../models/car-model-dto';

export interface BasicInfoControllerGetCarModels$Params {
  brandId: number;
}

export function basicInfoControllerGetCarModels(http: HttpClient, rootUrl: string, params: BasicInfoControllerGetCarModels$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CarModelDto>>> {
  const rb = new RequestBuilder(rootUrl, basicInfoControllerGetCarModels.PATH, 'get');
  if (params) {
    rb.path('brandId', params.brandId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CarModelDto>>;
    })
  );
}

basicInfoControllerGetCarModels.PATH = '/api/basic-info/{brandId}';
