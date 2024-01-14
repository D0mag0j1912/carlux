/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { preferencesControllerChangeLanguage } from '../fn/preferences/preferences-controller-change-language';
import { PreferencesControllerChangeLanguage$Params } from '../fn/preferences/preferences-controller-change-language';
import { preferencesControllerGetLanguage } from '../fn/preferences/preferences-controller-get-language';
import { PreferencesControllerGetLanguage$Params } from '../fn/preferences/preferences-controller-get-language';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `preferencesControllerGetLanguage()` */
  static readonly PreferencesControllerGetLanguagePath = '/api/preferences/language';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `preferencesControllerGetLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  preferencesControllerGetLanguage$Response(params: PreferencesControllerGetLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return preferencesControllerGetLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `preferencesControllerGetLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  preferencesControllerGetLanguage(params: PreferencesControllerGetLanguage$Params, context?: HttpContext): Observable<string> {
    return this.preferencesControllerGetLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `preferencesControllerChangeLanguage()` */
  static readonly PreferencesControllerChangeLanguagePath = '/api/preferences/language';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `preferencesControllerChangeLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  preferencesControllerChangeLanguage$Response(params: PreferencesControllerChangeLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return preferencesControllerChangeLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `preferencesControllerChangeLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  preferencesControllerChangeLanguage(params: PreferencesControllerChangeLanguage$Params, context?: HttpContext): Observable<string> {
    return this.preferencesControllerChangeLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
