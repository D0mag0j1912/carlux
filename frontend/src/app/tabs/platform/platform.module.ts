import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FeatureKeys } from '../../constants/feature-keys';
import * as fromPlatform from './reducers/platform-reducers';

@NgModule({
    imports: [StoreModule.forFeature(FeatureKeys.PLATFORM, fromPlatform.platformReducers)],
})
export class PlatformModule {}
