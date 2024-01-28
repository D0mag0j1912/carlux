import { createAction, props } from '@ngrx/store';
import { PreferencesDto as Preferences } from '../../../api/models/preferences-dto';
import { LanguageCodeType } from '../../../tabs/settings/models/language.type';

export const getPreferences = createAction(
    '[Preferences] Get Preferences',
    props<{ userId: number }>(),
);

export const setPreferences = createAction(
    '[Preferences] Set Preferences',
    props<{ preferences: Preferences }>(),
);

export const changeLanguage = createAction(
    '[Preferences] Change Language',
    props<{ userId: number; languageCode: LanguageCodeType }>(),
);

export const changeLanguageSuccess = createAction(
    '[Preferences] Change Language Success',
    props<{ updatedLanguageCode: LanguageCodeType }>(),
);
