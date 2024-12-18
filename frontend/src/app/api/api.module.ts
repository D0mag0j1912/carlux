/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthenticationService } from './services/authentication.service';
import { PreferencesService } from './services/preferences.service';
import { UserProfileDetailsService } from './services/user-profile-details.service';
import { FavouritesService } from './services/favourites.service';
import { CarDetailsService } from './services/car-details.service';
import { BasicCarInformationService } from './services/basic-car-information.service';
import { CarListService } from './services/car-list.service';
import { ExteriorColorsService } from './services/exterior-colors.service';
import { InteriorColorsService } from './services/interior-colors.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationService,
    PreferencesService,
    UserProfileDetailsService,
    FavouritesService,
    CarDetailsService,
    BasicCarInformationService,
    CarListService,
    ExteriorColorsService,
    InteriorColorsService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
