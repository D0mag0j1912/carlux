import { createAction, props } from '@ngrx/store';
import { ToastDurationValuesType } from '../models/toast-duration.type';

export const showToastMessage = createAction(
    '[Shared] Show toast message',
    props<{
        message: string;
        duration: ToastDurationValuesType;
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
