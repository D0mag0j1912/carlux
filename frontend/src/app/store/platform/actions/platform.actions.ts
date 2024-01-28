import { Platforms } from '@ionic/core';
import { createAction, props } from '@ngrx/store';

export const setPlatform = createAction(
    '[Platform] Set Platform',
    props<{ platforms: Platforms[] }>(),
);
