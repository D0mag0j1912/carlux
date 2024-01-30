import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonToolbar,
    IonAvatar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { languageSharp, personCircleOutline, pencil, trash } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, take } from 'rxjs';
import { AuthenticationFacadeService } from '../../store/auth/facades/auth-facade.service';
import { SettingsFacadeService } from '../../store/settings/facades/settings-facade.service';
import { UserDto as User } from '../../api/models/user-dto';

@Component({
    standalone: true,
    imports: [
        TranslocoModule,
        RouterModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
        IonNote,
        IonAvatar,
    ],
    selector: 'car-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _settingsFacadeService = inject(SettingsFacadeService);
    private _destroyRef = inject(DestroyRef);

    readonly LANGUAGES_COUNT = 2;

    initials = signal('');
    userAvatar = signal<string>('');

    constructor() {
        addIcons({ languageSharp, personCircleOutline, pencil, trash });
    }

    ngOnInit(): void {
        this._authenticationFacadeService
            .selectUserId()
            .pipe(filter(Boolean), take(1))
            .subscribe((userId: number) => this._settingsFacadeService.getProfileDetails(userId));

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

    logout(): void {
        this._authenticationFacadeService.logout();
    }

    private _generateInitials(firstName: string, lastName: string): void {
        const fullName = firstName + ' ' + lastName;
        const names = fullName.split(' ');
        this.initials.set(names.map((name: string) => name[0].toUpperCase()).join(''));
    }
}
