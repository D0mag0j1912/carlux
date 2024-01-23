/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { profileDetailsControllerGetProfileDetails } from '../fn/user-profile-details/profile-details-controller-get-profile-details';
import { ProfileDetailsControllerGetProfileDetails$Params } from '../fn/user-profile-details/profile-details-controller-get-profile-details';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UserProfileDetailsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `profileDetailsControllerGetProfileDetails()` */
  static readonly ProfileDetailsControllerGetProfileDetailsPath = '/api/profile-details/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileDetailsControllerGetProfileDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileDetailsControllerGetProfileDetails$Response(params: ProfileDetailsControllerGetProfileDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return profileDetailsControllerGetProfileDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `profileDetailsControllerGetProfileDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileDetailsControllerGetProfileDetails(params: ProfileDetailsControllerGetProfileDetails$Params, context?: HttpContext): Observable<UserDto> {
    return this.profileDetailsControllerGetProfileDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

}
