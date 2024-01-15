import { AsyncPipe, KeyValue } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { LanguageCodeType, LanguageTranslationType } from '../../models/language.type';
import { PreferencesFacadeService } from '../../../preferences/preferences-facade.service';

@Component({
    standalone: true,
    imports: [
        TranslocoModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonRadio,
        IonRadioGroup,
        AsyncPipe,
    ],
    selector: 'yac-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent {
    private _preferencesFacadeService = inject(PreferencesFacadeService);

    languageCode$ = this._preferencesFacadeService.selectLanguageCode();

    readonly LANGUAGES_DATA: KeyValue<LanguageCodeType, LanguageTranslationType>[] = [
        {
            key: 'hr',
            value: 'languages.croatian',
        },
        {
            key: 'en',
            value: 'languages.english',
        },
    ];

    onLanguageChange($event: unknown): void {}
}
