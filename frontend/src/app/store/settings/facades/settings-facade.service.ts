import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../..';
import { FeatureKeys } from '../../../constants/feature-keys';
import * as SettingsActions from '../actions/settings.actions';
import * as SettingsSelectors from '../selectors/settings.selectors';
import { UserDto as User } from '../../../api/models/user-dto';

@Injectable({ providedIn: 'root' })
export class SettingsFacadeService {
    private _store = inject(Store<AppState[FeatureKeys.SETTINGS]>);

    private _selectProfileDetails$ = this._store.select(SettingsSelectors.selectProfileDetails);

    private _selectIsNotLoading = this._store.selectSignal(SettingsSelectors.selectIsNotLoading);

    //Selectors BEGIN -------------------------
    selectProfileDetails(): Observable<User | undefined> {
        return this._selectProfileDetails$;
    }

    selectIsNotLoading(): Signal<boolean> {
        return this._selectIsNotLoading;
    }
    //Selectors END -------------------------

    //Actions BEGIN -------------------------
    getProfileDetails(userId: number): void {
        this._store.dispatch(SettingsActions.getProfileDetails({ userId }));
    }

    saveProfileDetails(profileDetails: User): void {
        this._store.dispatch(SettingsActions.saveProfileDetails({ profileDetails }));
    }

    setLoading(isLoading: boolean): void {
        this._store.dispatch(SettingsActions.setLoading({ isLoading }));
    }
    //Actions END -------------------------
}
