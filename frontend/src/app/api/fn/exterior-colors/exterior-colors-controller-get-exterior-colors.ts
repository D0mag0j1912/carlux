/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExteriorColorDto } from '../../models/exterior-color-dto';

export interface ExteriorColorsControllerGetExteriorColors$Params {
}

export function exteriorColorsControllerGetExteriorColors(http: HttpClient, rootUrl: string, params?: ExteriorColorsControllerGetExteriorColors$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExteriorColorDto>>> {
  const rb = new RequestBuilder(rootUrl, exteriorColorsControllerGetExteriorColors.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExteriorColorDto>>;
    })
  );
}

exteriorColorsControllerGetExteriorColors.PATH = '/api/exterior-colors';
