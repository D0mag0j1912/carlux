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
    ],
    selector: 'car-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
    private _destroyRef = inject(DestroyRef);
    private _settingsFacadeService = inject(SettingsFacadeService);

    profileDetails = signal<User | undefined>(undefined);
    initials = signal('');
    userAvatar = signal<string>('');

    ngOnInit(): void {
        this._settingsFacadeService
            .selectProfileDetails()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((profileDetails: User | undefined) => {
                this.profileDetails.set(profileDetails);
            });

        this._settingsFacadeService
            .selectProfileDetails()
            .pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
            .subscribe((profileDetails: User) => {
                if (!profileDetails.avatar) {
                    this._generateInitials(profileDetails.firstName, profileDetails.lastName);
                } else {
                    this.userAvatar.set(profileDetails.avatar);
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
            this.userAvatar.set(`../../../assets/images/${fileList[0].name}`);
        }
    }

    private _generateInitials(firstName: string, lastName: string): void {
        const fullName = firstName + ' ' + lastName;
        const names = fullName.split(' ');
        this.initials.set(names.map((name: string) => name[0].toUpperCase()).join(''));
    }
}
