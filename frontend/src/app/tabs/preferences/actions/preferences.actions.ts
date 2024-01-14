import { createAction, props } from '@ngrx/store';
import { PreferencesDto as Preferences } from '../../../api/models/preferences-dto';

export const getPreferences = createAction(
    '[Preferences] Get Preferences',
    props<{ userId: number }>(),
);

export const setPreferences = createAction(
    '[Preferences] Set Preferences',
    props<{ preferences: Preferences }>(),
);
