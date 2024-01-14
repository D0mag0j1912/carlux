import { createAction, props } from '@ngrx/store';

export const getPreferences = createAction(
    '[Preferences] Get Preferences',
    props<{ userId: number }>(),
);

export const setPreferences = createAction('[Preferences] Set Preferences');
