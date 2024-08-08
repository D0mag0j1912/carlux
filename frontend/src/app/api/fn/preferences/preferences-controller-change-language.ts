/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { LanguageChangeDto } from '../../models/language-change-dto';

export interface PreferencesControllerChangeLanguage$Params {
    body: LanguageChangeDto;
}

export function preferencesControllerChangeLanguage(
    http: HttpClient,
    rootUrl: string,
    params: PreferencesControllerChangeLanguage$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<LanguageChangeDto>> {
    const rb = new RequestBuilder(rootUrl, preferencesControllerChangeLanguage.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http
        .request(rb.build({ responseType: 'json', accept: 'application/json', context }))
        .pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<LanguageChangeDto>;
            }),
        );
}

preferencesControllerChangeLanguage.PATH = '/api/preferences/language';
