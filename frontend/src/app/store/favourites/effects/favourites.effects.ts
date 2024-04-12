import { inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { SharedFacadeService } from '../../shared/facades/shared-facade.service';

export const getFavourites$ = createEffect(
    (actions$ = inject(Actions), sharedFacadeService = inject(SharedFacadeService)) =>
        actions$.pipe(),
    { functional: true },
);
