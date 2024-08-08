import { inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { LanguageChangeDto as ChangeLanguageResponse } from '../../../api/models/language-change-dto';
import { PreferencesDto as Preferences } from '../../../api/models/preferences-dto';
import { PreferencesService } from '../../../api/services/preferences.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as PreferencesActions from '../actions/preferences.actions';

export const getPreferences$ = createEffect(
    (
        actions$ = inject(Actions),
        preferencesService = inject(PreferencesService),
        sharedFacadeService = inject(SharedFacadeService),
    ) =>
        actions$.pipe(
            ofType(PreferencesActions.getPreferences),
            switchMap((action) =>
                preferencesService
                    .preferencesControllerGetPreferences({ userId: action.userId })
                    .pipe(
                        catchError((_) => {
                            sharedFacadeService.showToastMessage(
                                'preferences.errors.get_preferences',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((preferences: Preferences) =>
                            PreferencesActions.setPreferences({ preferences }),
                        ),
                    ),
            ),
        ),
    { functional: true },
);

export const changeLanguage$ = createEffect(
    (
        actions$ = inject(Actions),
        preferencesService = inject(PreferencesService),
        sharedFacadeService = inject(SharedFacadeService),
    ) =>
        actions$.pipe(
            ofType(PreferencesActions.changeLanguage),
            switchMap((action) =>
                preferencesService
                    .preferencesControllerChangeLanguage({
                        body: { userId: action.userId, languageCode: action.languageCode },
                    })
                    .pipe(
                        catchError((_) => {
                            sharedFacadeService.showToastMessage(
                                'preferences.errors.change_language',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((response: ChangeLanguageResponse) =>
                            PreferencesActions.changeLanguageSuccess({
                                updatedLanguageCode: response.languageCode,
                            }),
                        ),
                    ),
            ),
        ),
    { functional: true },
);

export const listenToLanguageChange$ = createEffect(
    (actions$ = inject(Actions), translocoService = inject(TranslocoService)) =>
        actions$.pipe(
            ofType(PreferencesActions.changeLanguageSuccess),
            tap((action) => {
                const updatedLanguageCode = action.updatedLanguageCode;
                translocoService.setActiveLang(updatedLanguageCode);
            }),
        ),
    { functional: true, dispatch: false },
);
