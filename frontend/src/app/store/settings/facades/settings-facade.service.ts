import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { UserDto as User } from '../../../api/models/user-dto';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as SettingsActions from '../actions/settings.actions';
import * as SettingsSelectors from '../selectors/settings.selectors';

@Injectable({ providedIn: 'root' })
export class SettingsFacadeService {
    #store = inject(Store<AppState[FeatureKeys.SETTINGS]>);

    //Selectors BEGIN -------------------------
    selectProfileDetails(): Observable<User | undefined> {
        return this.#store.select(SettingsSelectors.selectProfileDetails);
    }

    selectIsNotLoading(): Signal<boolean> {
        return this.#store.selectSignal(SettingsSelectors.selectIsNotLoading);
    }
    //Selectors END -------------------------

    //Actions BEGIN -------------------------
    getProfileDetails(userId: number): void {
        this.#store.dispatch(SettingsActions.getProfileDetails({ userId }));
    }

    saveProfileDetails(profileDetails: User): void {
        this.#store.dispatch(SettingsActions.saveProfileDetails({ profileDetails }));
    }

    setLoading(isLoading: boolean): void {
        this.#store.dispatch(SettingsActions.setLoading({ isLoading }));
    }
    //Actions END -------------------------
}
