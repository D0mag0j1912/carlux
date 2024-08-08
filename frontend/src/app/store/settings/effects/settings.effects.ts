import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, concatMap, finalize, map, switchMap, tap } from 'rxjs';
import { UserDto as User } from '../../../api/models/user-dto';
import { UserProfileDetailsService } from '../../../api/services/user-profile-details.service';
import { POPUP_DURATIONS } from '../../../constants/popup-durations';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';
import * as SettingsActions from '../actions/settings.actions';
import { SettingsFacadeService } from '../facades/settings-facade.service';

export const getProfileDetails$ = createEffect(
    (
        actions$ = inject(Actions),
        userProfileDetailsService = inject(UserProfileDetailsService),
        sharedFacadeService = inject(SharedFacadeService),
        settingsFacadeService = inject(SettingsFacadeService),
    ) =>
        actions$.pipe(
            ofType(SettingsActions.getProfileDetails),
            tap(() => settingsFacadeService.setLoading(true)),
            switchMap((action) =>
                userProfileDetailsService
                    .profileDetailsControllerGetProfileDetails({ userId: action.userId })
                    .pipe(
                        catchError((_) => {
                            sharedFacadeService.showToastMessage(
                                'settings.errors.get_profile_details',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((profileDetails: User) =>
                            SettingsActions.setProfileDetails({ profileDetails }),
                        ),
                        finalize(() => settingsFacadeService.setLoading(false)),
                    ),
            ),
        ),
    { functional: true },
);

export const saveProfileDetails$ = createEffect(
    (
        actions$ = inject(Actions),
        userProfileDetailsService = inject(UserProfileDetailsService),
        sharedFacadeService = inject(SharedFacadeService),
    ) =>
        actions$.pipe(
            ofType(SettingsActions.saveProfileDetails),
            concatMap((action) =>
                userProfileDetailsService
                    .profileDetailsControllerSaveProfileDetails({ body: action.profileDetails })
                    .pipe(
                        catchError((_) => {
                            sharedFacadeService.showToastMessage(
                                'settings.errors.save_profile_details',
                                POPUP_DURATIONS.ERROR,
                                'warning',
                            );
                            return EMPTY;
                        }),
                        map((profileDetails: User) =>
                            SettingsActions.setProfileDetails({ profileDetails }),
                        ),
                    ),
            ),
        ),
    { functional: true },
);
