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
    private _store = inject(Store<AppState[FeatureKeys.PREFERENCES]>);

    private _selectUserId$ = this._store.select(PreferencesSelectors.selectUserId);

    private _selectLanguageCode$ = this._store.select(PreferencesSelectors.selectLanguageCode);

    //Actions BEGIN -------------------------
    getPreferences(userId: number): void {
        this._store.dispatch(PreferencesActions.getPreferences({ userId }));
    }

    changeLanguage(userId: number, languageCode: LanguageCodeType): void {
        this._store.dispatch(PreferencesActions.changeLanguage({ userId, languageCode }));
    }
    //Actions END -------------------------

    //Selectors BEGIN -------------------------
    selectUserId(): Observable<number | undefined> {
        return this._selectUserId$;
    }

    selectLanguageCode(): Observable<LanguageCodeType | undefined> {
        return this._selectLanguageCode$;
    }
    //Selectors END -------------------------
}
