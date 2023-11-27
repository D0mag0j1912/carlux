import { createAction, props } from '@ngrx/store';
import { PopupDurationsValuesType } from '../models/popup-durations.type';

export const showToastMessage = createAction(
    '[Shared] Show toast message',
    props<{
        message: string;
        duration: PopupDurationsValuesType;
        icon: 'warning';
        cssClass: string;
    }>(),
);

export const showLoadingIndicator = createAction(
    '[Shared] Show loading indicator',
    props<{
        message: string;
        duration: PopupDurationsValuesType;
    }>(),
);

export const dismissLoadingIndicator = createAction('[Shared] Dismiss loading indicator');
