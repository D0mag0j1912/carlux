import { TOAST_DURATION } from '../../../constants/toast-duration';

type ToastDurationKeysType = keyof typeof TOAST_DURATION;
export type ToastDurationValuesType = (typeof TOAST_DURATION)[ToastDurationKeysType];
