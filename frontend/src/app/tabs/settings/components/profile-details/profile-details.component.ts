import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
import { filter, from, take } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';
import { DateTimePickerComponent } from '../../../../shared/datetime-picker/datetime-picker.component';
import { DATETIME_PICKER_INPUT_FORMAT } from '../../../../constants/datetime-picker-input-format';
import { SettingsFacadeService } from '../../../../store/settings/facades/settings-facade.service';
import { AuthenticationFacadeService } from '../../../auth/auth-facade.service';
import { UserDto as User } from '../../../../api/models/user-dto';

const DATE_FORMAT = 'yyyy-MM-dd';
const PRESENTATION_DATE = 'MMM d, yyyy';
const DATETIME_PICKER_CUSTOM_CLASS = 'datetime-picker';

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
    providers: [ModalController],
})
export class ProfileDetailsComponent implements OnInit {
    private _modalController = inject(ModalController);
    private _destroyRef = inject(DestroyRef);
    private _settingsFacadeService = inject(SettingsFacadeService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);

    formattedTodayDate = signal<string>('');
    profileDetails = signal<User | undefined>(undefined);

    constructor() {
        addIcons({ calendarOutline });
    }

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
                if (this.profileDetails()) {
                    this._setFormattedDate(this.profileDetails()?.birthDate);
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

    async openDateTimePicker(): Promise<void> {
        const modal = await this._modalController.create({
            component: DateTimePickerComponent,
            componentProps: {
                dateValue: format(new Date(), DATETIME_PICKER_INPUT_FORMAT),
            },
            cssClass: DATETIME_PICKER_CUSTOM_CLASS,
        });
        await modal.present();

        from(modal.onDidDismiss<string | undefined>())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }

    private _setFormattedDate(dateValue: string | undefined): void {
        if (dateValue) {
            const [date, time] = dateValue.split('T');
            this.formattedTodayDate.set(
                format(
                    parseISO(format(new Date(date), DATE_FORMAT) + `T${time}`),
                    PRESENTATION_DATE,
                ),
            );
        }
    }
}
