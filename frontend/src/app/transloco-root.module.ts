import { provideTransloco, TranslocoModule } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslocoHttpLoader } from './transloco-loader';

@NgModule({
    exports: [TranslocoModule],
    providers: [
        provideTransloco({
            config: {
                availableLangs: ['en', 'hr'],
                defaultLang: 'en',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: environment.production,
            },
            loader: TranslocoHttpLoader,
        }),
    ],
})
export class TranslocoRootModule {}
