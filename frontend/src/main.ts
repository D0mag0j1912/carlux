import { enableProdMode, importProvidersFrom } from '@angular/core';
import { IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideTransloco } from '@ngneat/transloco';
import { environment } from './environments/environment';
import { RootComponent } from './app/root.component';
import { routes } from './app/app.routes';
import { appReducers } from './app';
import { SharedEffects } from './app/store/shared/effects/shared.effects';
import { ApiModule } from './app/api';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import * as PreferencesEffects from './app/store/preferences/effects/preferences.effects';
import { TranslocoHttpLoader } from './app/transloco-loader';
import * as PlatformReducers from './app/store/platform/reducers/platform.reducers';
import { FeatureKeys } from './app/constants/feature-keys';

const PLATFORM_PROVIDERS = importProvidersFrom([
    StoreModule.forFeature(FeatureKeys.PLATFORM, PlatformReducers.platformReducers),
]);

if (environment.production) {
    enableProdMode();
}

void bootstrapApplication(RootComponent, {
    providers: [
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
            StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
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
