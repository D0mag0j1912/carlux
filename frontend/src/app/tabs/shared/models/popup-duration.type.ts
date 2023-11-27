import { POPUP_DURATIONS } from '../../../constants/popup-durations';

type PopupDurationsKeysType = keyof typeof POPUP_DURATIONS;
export type PopupDurationsValuesType = (typeof POPUP_DURATIONS)[PopupDurationsKeysType];
