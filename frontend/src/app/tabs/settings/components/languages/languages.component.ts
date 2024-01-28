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
import { filter, take } from 'rxjs';
import { LanguageCodeType, LanguageTranslationType } from '../../models/language.type';
import { PreferencesFacadeService } from '../../../../store/preferences/facades/preferences-facade.service';

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
    selector: 'car-languages',
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

    onLanguageChange($event: CustomEvent): void {
        const languageCode = ($event.detail as { value: LanguageCodeType; event: PointerEvent })
            .value;
        this._preferencesFacadeService
            .selectUserId()
            .pipe(take(1), filter(Boolean))
            .subscribe((userId: number) =>
                this._preferencesFacadeService.changeLanguage(userId, languageCode),
            );
    }
}
