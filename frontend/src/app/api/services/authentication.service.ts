/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authControllerSendSms } from '../fn/authentication/auth-controller-send-sms';
import { AuthControllerSendSms$Params } from '../fn/authentication/auth-controller-send-sms';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authControllerSendSms()` */
  static readonly AuthControllerSendSmsPath = '/api/auth/phone-verification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerSendSms()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerSendSms$Response(params?: AuthControllerSendSms$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authControllerSendSms(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authControllerSendSms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerSendSms(params?: AuthControllerSendSms$Params, context?: HttpContext): Observable<void> {
    return this.authControllerSendSms$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
