/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { StatusResponseDto } from '../../models/status-response-dto';

export interface AuthControllerSendSms$Params {
    body: string;
}

export function authControllerSendSms(
    http: HttpClient,
    rootUrl: string,
    params: AuthControllerSendSms$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<StatusResponseDto>> {
    const rb = new RequestBuilder(rootUrl, authControllerSendSms.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http
        .request(rb.build({ responseType: 'json', accept: 'application/json', context }))
        .pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<StatusResponseDto>;
            }),
        );
}

authControllerSendSms.PATH = '/api/auth/send-sms';
