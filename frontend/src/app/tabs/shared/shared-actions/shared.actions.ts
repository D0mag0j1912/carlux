import { createAction, props } from '@ngrx/store';
import { PopupDurationValuesType } from '../models/toast-duration.type';

export const showToastMessage = createAction(
    '[Shared] Show toast message',
    props<{
        message: string;
        duration: PopupDurationValuesType;
        icon: 'warning';
        cssClass: string;
    }>(),
);

export const showLoadingIndicator = createAction(
    '[Shared] Show loading indicator',
    props<{
        message: string;
        duration: number;
    }>(),
);

export const dismissLoadingIndicator = createAction('[Shared] Dismiss loading indicator');
