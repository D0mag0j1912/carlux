/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authControllerRegister } from '../fn/authentication/auth-controller-register';
import { AuthControllerRegister$Params } from '../fn/authentication/auth-controller-register';
import { authControllerSendSms } from '../fn/authentication/auth-controller-send-sms';
import { AuthControllerSendSms$Params } from '../fn/authentication/auth-controller-send-sms';
import { authControllerVerifyCode } from '../fn/authentication/auth-controller-verify-code';
import { AuthControllerVerifyCode$Params } from '../fn/authentication/auth-controller-verify-code';
import { StatusResponseDto } from '../models/status-response-dto';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authControllerSendSms()` */
  static readonly AuthControllerSendSmsPath = '/api/auth/send-sms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerSendSms()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerSendSms$Response(params: AuthControllerSendSms$Params, context?: HttpContext): Observable<StrictHttpResponse<StatusResponseDto>> {
    return authControllerSendSms(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authControllerSendSms$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerSendSms(params: AuthControllerSendSms$Params, context?: HttpContext): Observable<StatusResponseDto> {
    return this.authControllerSendSms$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatusResponseDto>): StatusResponseDto => r.body)
    );
  }

  /** Path part for operation `authControllerVerifyCode()` */
  static readonly AuthControllerVerifyCodePath = '/api/auth/phone-verification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerVerifyCode()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerVerifyCode$Response(params: AuthControllerVerifyCode$Params, context?: HttpContext): Observable<StrictHttpResponse<StatusResponseDto>> {
    return authControllerVerifyCode(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authControllerVerifyCode$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerVerifyCode(params: AuthControllerVerifyCode$Params, context?: HttpContext): Observable<StatusResponseDto> {
    return this.authControllerVerifyCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatusResponseDto>): StatusResponseDto => r.body)
    );
  }

  /** Path part for operation `authControllerRegister()` */
  static readonly AuthControllerRegisterPath = '/api/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerRegister()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRegister$Response(params: AuthControllerRegister$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return authControllerRegister(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authControllerRegister$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRegister(params: AuthControllerRegister$Params, context?: HttpContext): Observable<User> {
    return this.authControllerRegister$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

}
