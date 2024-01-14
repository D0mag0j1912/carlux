import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
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
    ],
    selector: 'yac-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent {
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
