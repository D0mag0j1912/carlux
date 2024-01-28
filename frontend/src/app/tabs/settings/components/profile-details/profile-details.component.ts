import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonRow,
    IonTitle,
    IonToolbar,
    IonItem,
    IonIcon,
    IonLabel,
    IonText,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';
import { filter, take } from 'rxjs';
import { DateTimePickerComponent } from '../../../../shared/datetime-picker/datetime-picker.component';
import { SettingsFacadeService } from '../../../../store/settings/facades/settings-facade.service';
import { AuthenticationFacadeService } from '../../../auth/auth-facade.service';
import { UserDto as User } from '../../../../api/models/user-dto';

@Component({
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton,
        IonItem,
        IonIcon,
        IonLabel,
        IonText,
        TranslocoModule,
        FormsModule,
        DateTimePickerComponent,
    ],
    selector: 'car-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
    private _destroyRef = inject(DestroyRef);
    private _settingsFacadeService = inject(SettingsFacadeService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);

    profileDetails = signal<User | undefined>(undefined);

    ngOnInit(): void {
        this._authenticationFacadeService
            .selectUserId()
            .pipe(take(1), filter(Boolean))
            .subscribe((userId: number) => this._settingsFacadeService.getProfileDetails(userId));

        this._settingsFacadeService
            .selectProfileDetails()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((profileDetails: User | undefined) => {
                this.profileDetails.set(profileDetails);
            });
    }

    saveProfileDetails(): void {
        const profileDetails = this.profileDetails() as User;
        this._settingsFacadeService.saveProfileDetails(profileDetails);
    }

    setFirstName(firstName: string): void {
        this.profileDetails.update((user: User | undefined) => {
            if (user) {
                return {
                    ...user,
                    firstName,
                };
            }
            return undefined;
        });
    }

    setLastName(lastName: string): void {
        this.profileDetails.update((user: User | undefined) => {
            if (user) {
                return { ...user, lastName };
            }
            return undefined;
        });
    }
}
