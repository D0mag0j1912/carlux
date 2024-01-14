/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PreferencesDto } from '../../models/preferences-dto';

export interface PreferencesControllerGetLanguage$Params {
  userId: number;
}

export function preferencesControllerGetLanguage(http: HttpClient, rootUrl: string, params: PreferencesControllerGetLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<PreferencesDto>> {
  const rb = new RequestBuilder(rootUrl, preferencesControllerGetLanguage.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PreferencesDto>;
    })
  );
}

preferencesControllerGetLanguage.PATH = '/api/preferences';
