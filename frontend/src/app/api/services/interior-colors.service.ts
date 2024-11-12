/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { interiorColorsControllerGetExteriorColors } from '../fn/interior-colors/interior-colors-controller-get-exterior-colors';
import { InteriorColorsControllerGetExteriorColors$Params } from '../fn/interior-colors/interior-colors-controller-get-exterior-colors';
import { InteriorColorsDto } from '../models/interior-colors-dto';

@Injectable({ providedIn: 'root' })
export class InteriorColorsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `interiorColorsControllerGetExteriorColors()` */
  static readonly InteriorColorsControllerGetExteriorColorsPath = '/api/interior-colors';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `interiorColorsControllerGetExteriorColors()` instead.
   *
   * This method doesn't expect any request body.
   */
  interiorColorsControllerGetExteriorColors$Response(params?: InteriorColorsControllerGetExteriorColors$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InteriorColorsDto>>> {
    return interiorColorsControllerGetExteriorColors(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `interiorColorsControllerGetExteriorColors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  interiorColorsControllerGetExteriorColors(params?: InteriorColorsControllerGetExteriorColors$Params, context?: HttpContext): Observable<Array<InteriorColorsDto>> {
    return this.interiorColorsControllerGetExteriorColors$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<InteriorColorsDto>>): Array<InteriorColorsDto> => r.body)
    );
  }

}
