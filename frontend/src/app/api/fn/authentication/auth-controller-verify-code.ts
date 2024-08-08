/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { StatusResponseDto } from '../../models/status-response-dto';
import { VerifyCodeDto } from '../../models/verify-code-dto';

export interface AuthControllerVerifyCode$Params {
    body: VerifyCodeDto;
}

export function authControllerVerifyCode(
    http: HttpClient,
    rootUrl: string,
    params: AuthControllerVerifyCode$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<StatusResponseDto>> {
    const rb = new RequestBuilder(rootUrl, authControllerVerifyCode.PATH, 'post');
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

authControllerVerifyCode.PATH = '/api/auth/phone-verification';
