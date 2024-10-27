/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ExteriorColorDto } from '../models/exterior-color-dto';
import { exteriorColorsControllerGetExteriorColors } from '../fn/exterior-colors/exterior-colors-controller-get-exterior-colors';
import { ExteriorColorsControllerGetExteriorColors$Params } from '../fn/exterior-colors/exterior-colors-controller-get-exterior-colors';

@Injectable({ providedIn: 'root' })
export class ExteriorColorsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `exteriorColorsControllerGetExteriorColors()` */
  static readonly ExteriorColorsControllerGetExteriorColorsPath = '/api/exterior-colors';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `exteriorColorsControllerGetExteriorColors()` instead.
   *
   * This method doesn't expect any request body.
   */
  exteriorColorsControllerGetExteriorColors$Response(params?: ExteriorColorsControllerGetExteriorColors$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExteriorColorDto>>> {
    return exteriorColorsControllerGetExteriorColors(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `exteriorColorsControllerGetExteriorColors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  exteriorColorsControllerGetExteriorColors(params?: ExteriorColorsControllerGetExteriorColors$Params, context?: HttpContext): Observable<Array<ExteriorColorDto>> {
    return this.exteriorColorsControllerGetExteriorColors$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExteriorColorDto>>): Array<ExteriorColorDto> => r.body)
    );
  }

}
