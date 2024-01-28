import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlatformState } from '../reducers/platform.reducers';
import { FeatureKeys } from '../../../constants/feature-keys';
import {
    ANDROID_MODE,
    DESKTOP_MODE,
    IOS_MODE,
    MOBILE_MODE,
} from '../../../constants/platform-mode';

export const selectPlatformState = createFeatureSelector<PlatformState>(FeatureKeys.PLATFORM);

export const selectIsDesktopMode = createSelector(
    selectPlatformState,
    (platformState: PlatformState) => platformState.platforms.includes(DESKTOP_MODE),
);

export const selectIsMobileMode = createSelector(
    selectPlatformState,
    (platformState: PlatformState) =>
        platformState.platforms.includes(ANDROID_MODE) ||
        platformState.platforms.includes(IOS_MODE) ||
        platformState.platforms.includes(MOBILE_MODE),
);
