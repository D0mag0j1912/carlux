/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { LanguageChangeDto } from '../models/language-change-dto';
import { preferencesControllerChangeLanguage } from '../fn/preferences/preferences-controller-change-language';
import { PreferencesControllerChangeLanguage$Params } from '../fn/preferences/preferences-controller-change-language';
import { preferencesControllerGetPreferences } from '../fn/preferences/preferences-controller-get-preferences';
import { PreferencesControllerGetPreferences$Params } from '../fn/preferences/preferences-controller-get-preferences';
import { PreferencesDto } from '../models/preferences-dto';

@Injectable({ providedIn: 'root' })
export class PreferencesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `preferencesControllerChangeLanguage()` */
  static readonly PreferencesControllerChangeLanguagePath = '/api/preferences/language';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `preferencesControllerChangeLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  preferencesControllerChangeLanguage$Response(params: PreferencesControllerChangeLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<LanguageChangeDto>> {
    return preferencesControllerChangeLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `preferencesControllerChangeLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  preferencesControllerChangeLanguage(params: PreferencesControllerChangeLanguage$Params, context?: HttpContext): Observable<LanguageChangeDto> {
    return this.preferencesControllerChangeLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<LanguageChangeDto>): LanguageChangeDto => r.body)
    );
  }

  /** Path part for operation `preferencesControllerGetPreferences()` */
  static readonly PreferencesControllerGetPreferencesPath = '/api/preferences/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `preferencesControllerGetPreferences()` instead.
   *
   * This method doesn't expect any request body.
   */
  preferencesControllerGetPreferences$Response(params: PreferencesControllerGetPreferences$Params, context?: HttpContext): Observable<StrictHttpResponse<PreferencesDto>> {
    return preferencesControllerGetPreferences(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `preferencesControllerGetPreferences$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  preferencesControllerGetPreferences(params: PreferencesControllerGetPreferences$Params, context?: HttpContext): Observable<PreferencesDto> {
    return this.preferencesControllerGetPreferences$Response(params, context).pipe(
      map((r: StrictHttpResponse<PreferencesDto>): PreferencesDto => r.body)
    );
  }

}
