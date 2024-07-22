import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import {
    enableProdMode,
    importProvidersFrom,
    provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideTransloco } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app';
import { ApiModule } from './app/api';
import { routes } from './app/app.routes';
import { FeatureKeys } from './app/constants/feature-keys';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { RootComponent } from './app/root.component';
import * as PlatformReducers from './app/store/platform/reducers/platform.reducers';
import * as PreferencesEffects from './app/store/preferences/effects/preferences.effects';
import { SharedEffects } from './app/store/shared/effects/shared.effects';
import { TranslocoHttpLoader } from './app/transloco-loader';
import { environment } from './environments/environment';

const PLATFORM_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.PLATFORM, PlatformReducers.platformReducers),
]);

if (environment.production) {
    enableProdMode();
}

void bootstrapApplication(RootComponent, {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
        provideIonicAngular(),
        importProvidersFrom([
            BrowserModule,
            StoreModule.forRoot(appReducers, {
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                    strictActionSerializability: true,
                    strictStateSerializability: true,
                },
            }),
            StoreDevtoolsModule.instrument({
                maxAge: 25,
                logOnly: environment.production,
                connectInZone: true,
            }),
            EffectsModule.forRoot([SharedEffects, PreferencesEffects]),
            ApiModule.forRoot({ rootUrl: environment.apiUrl }),
        ]),
        PLATFORM_PROVIDERS,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(),
        provideTransloco({
            config: {
                availableLangs: ['en', 'hr'],
                defaultLang: 'en',
                reRenderOnLangChange: true,
                prodMode: environment.production,
            },
            loader: TranslocoHttpLoader,
        }),
    ],
});
