/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { UserDto } from '../../models/user-dto';

export interface ProfileDetailsControllerGetProfileDetails$Params {
    userId: number;
}

export function profileDetailsControllerGetProfileDetails(
    http: HttpClient,
    rootUrl: string,
    params: ProfileDetailsControllerGetProfileDetails$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<UserDto>> {
    const rb = new RequestBuilder(rootUrl, profileDetailsControllerGetProfileDetails.PATH, 'get');
    if (params) {
        rb.path('userId', params.userId, {});
    }

    return http
        .request(rb.build({ responseType: 'json', accept: 'application/json', context }))
        .pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<UserDto>;
            }),
        );
}

profileDetailsControllerGetProfileDetails.PATH = '/api/profile-details/{userId}';
