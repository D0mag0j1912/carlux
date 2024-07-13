import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { FeatureKeys } from '../../../constants/feature-keys';
import { LanguageCodeType } from '../../../tabs/settings/models/language.type';
import * as PreferencesActions from '../actions/preferences.actions';
import * as PreferencesSelectors from '../selectors/preferences.selectors';

@Injectable({ providedIn: 'root' })
export class PreferencesFacadeService {
    #store = inject(Store<AppState[FeatureKeys.PREFERENCES]>);

    //Selectors BEGIN -------------------------
    selectUserId(): Observable<number | undefined> {
        return this.#store.select(PreferencesSelectors.selectUserId);
    }

    selectLanguageCode(): Observable<LanguageCodeType | undefined> {
        return this.#store.select(PreferencesSelectors.selectLanguageCode);
    }
    //Selectors END -------------------------

    //Actions BEGIN -------------------------
    getPreferences(userId: number): void {
        this.#store.dispatch(PreferencesActions.getPreferences({ userId }));
    }

    changeLanguage(userId: number, languageCode: LanguageCodeType): void {
        this.#store.dispatch(PreferencesActions.changeLanguage({ userId, languageCode }));
    }
    //Actions END -------------------------
}
