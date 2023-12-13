import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { PlatformModule } from './tabs/platform/platform.module';
import { ApiModule } from './api/api.module';
import { TranslocoRootModule } from './transloco-root.module';
import { RootComponent } from './root.component';
import { AppRoutingModule } from './root-routing.module';
import { SharedEffects } from './tabs/shared/shared-effects/shared.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { appReducers } from '.';

@NgModule({
    declarations: [RootComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        PlatformModule,
        StoreModule.forRoot(appReducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionSerializability: true,
                strictStateSerializability: true,
            },
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([SharedEffects]),
        HttpClientModule,
        TranslocoRootModule,
        ApiModule.forRoot({ rootUrl: environment.apiUrl }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [RootComponent],
})
export class AppModule {}
