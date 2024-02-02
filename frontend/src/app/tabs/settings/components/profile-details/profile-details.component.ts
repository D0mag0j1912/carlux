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
import { filter } from 'rxjs';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { AsyncPipe } from '@angular/common';
import { DateTimePickerComponent } from '../../../../shared/datetime-picker/datetime-picker.component';
import { SettingsFacadeService } from '../../../../store/settings/facades/settings-facade.service';
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
        AsyncPipe,
    ],
    selector: 'car-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
    private _destroyRef = inject(DestroyRef);
    private _settingsFacadeService = inject(SettingsFacadeService);

    areSettingsNotLoading$ = this._settingsFacadeService.selectIsNotLoading();

    profileDetails = signal<User | undefined>(undefined);
    initials = signal('');

    constructor() {
        addIcons({ pencil, trash });
    }

    ngOnInit(): void {
        this._settingsFacadeService
            .selectProfileDetails()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((profileDetails: User) => {
                this.profileDetails.set(profileDetails);
                if (!profileDetails.avatar) {
                    this._generateInitials(profileDetails.firstName, profileDetails.lastName);
                }
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

    onFilePickerChange($event: Event): void {
        const target = $event.target as HTMLInputElement;
        const fileList: FileList | null = target.files;
        if (fileList?.length) {
            const avatar = `../../../assets/images/${fileList[0].name}`;
            this.profileDetails.update((user: User | undefined) => {
                if (user) {
                    return {
                        ...user,
                        avatar,
                    };
                }
                return undefined;
            });
        }
    }

    resetProfilePicture(): void {
        this.profileDetails.update((user: User | undefined) => {
            if (user) {
                return {
                    ...user,
                    avatar: undefined,
                };
            }
            return undefined;
        });
        this._generateInitials(this.profileDetails()?.firstName, this.profileDetails()?.lastName);
    }

    private _generateInitials(firstName: string | undefined, lastName: string | undefined): void {
        const fullName = firstName + ' ' + lastName;
        const names = fullName.split(' ');
        this.initials.set(names.map((name: string) => name[0].toUpperCase()).join(''));
    }
}
