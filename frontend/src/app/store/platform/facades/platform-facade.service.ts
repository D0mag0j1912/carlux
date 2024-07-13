import { inject, Injectable } from '@angular/core';
import { Platforms } from '@ionic/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as PlatformActions from '../actions/platform.actions';
import { selectIsDesktopMode } from '../selectors/platform.selectors';

@Injectable({ providedIn: 'root' })
export class PlatformFacadeService {
    #store = inject(Store<AppState[FeatureKeys.PLATFORM]>);

    //Selectors BEGIN -------------------------
    selectIsDesktopMode(): Observable<boolean> {
        return this.#store.select(selectIsDesktopMode);
    }
    //Selectors END ---------------------------

    //Actions BEGIN ---------------------------
    setPlatform(platforms: Platforms[]): void {
        this.#store.dispatch(PlatformActions.setPlatform({ platforms }));
    }
    //Actions END ---------------------------
}
