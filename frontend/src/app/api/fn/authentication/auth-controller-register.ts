/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LoginResponseDto } from '../../models/login-response-dto';
import { UserDto } from '../../models/user-dto';

export interface AuthControllerRegister$Params {
      body: UserDto
}

export function authControllerRegister(http: HttpClient, rootUrl: string, params: AuthControllerRegister$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponseDto>> {
  const rb = new RequestBuilder(rootUrl, authControllerRegister.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LoginResponseDto>;
    })
  );
}

authControllerRegister.PATH = '/api/auth/register';
