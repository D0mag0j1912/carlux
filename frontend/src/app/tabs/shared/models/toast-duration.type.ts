import { POPUP_DURATIONS } from '../../../constants/popup-duration';

type PopupDurationKeysType = keyof typeof POPUP_DURATIONS;
export type PopupDurationValuesType = (typeof POPUP_DURATIONS)[PopupDurationKeysType];
