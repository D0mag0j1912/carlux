/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { PreferencesDto } from '../../models/preferences-dto';

export interface PreferencesControllerGetPreferences$Params {
    userId: number;
}

export function preferencesControllerGetPreferences(
    http: HttpClient,
    rootUrl: string,
    params: PreferencesControllerGetPreferences$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<PreferencesDto>> {
    const rb = new RequestBuilder(rootUrl, preferencesControllerGetPreferences.PATH, 'get');
    if (params) {
        rb.path('userId', params.userId, {});
    }

    return http
        .request(rb.build({ responseType: 'json', accept: 'application/json', context }))
        .pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<PreferencesDto>;
            }),
        );
}

preferencesControllerGetPreferences.PATH = '/api/preferences/{userId}';
