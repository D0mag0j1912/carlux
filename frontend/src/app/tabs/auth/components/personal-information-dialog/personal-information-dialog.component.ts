import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
import { TranslocoModule } from '@ngneat/transloco';
import { format, parseISO } from 'date-fns';
import { filter, from } from 'rxjs';
import { UserDto as User } from '../../../../api/models/user-dto';
import { DateTimePickerComponent } from '../../../../components/datetime-picker/datetime-picker.component';
import { DATETIME_PICKER_INPUT_FORMAT } from '../../../../constants/datetime-picker-input-format';
import { DialogRoles } from '../../../../constants/dialog-roles';
import { AuthenticationFacadeService } from '../../../../store/auth/facades/auth-facade.service';
import { AuthenticationEventEmitterService } from '../../event-emitter/auth-event-emitter.service';
import { emailExistsValidator } from '../../validators/email-exists.validator';

@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TranslocoModule,
        DateTimePickerComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton,
    ],
    templateUrl: './personal-information-dialog.component.html',
    styleUrl: './personal-information-dialog.component.scss',
})
export class PersonalInformationDialogComponent implements OnInit {
    private _authenticationEventEmitterService = inject(AuthenticationEventEmitterService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _modalController = inject(ModalController);
    private _destroyRef = inject(DestroyRef);
    private _navController = inject(NavController);

    readonly MAX_CHARACTERS = 100;

    form = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        birthDate: new FormControl<string | undefined>('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email], emailExistsValidator()),
    });

    ngOnInit(): void {
        this._authenticationEventEmitterService
            .getAuthSuccess()
            .pipe(
                filter((data) => data.type === 'signUp'),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe(async (_) => {
                await this._modalController.dismiss();
                await this._navController.navigateForward('tabs/car-list');
            });
    }

    async onOpenDatetimePicker(): Promise<void> {
        const modal = await this._modalController.create({
            component: DateTimePickerComponent,
            componentProps: {
                dateValue: format(new Date(), DATETIME_PICKER_INPUT_FORMAT),
            },
            cssClass: 'datetime-picker',
        });

        await modal.present();

        from(modal.onDidDismiss())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((data: OverlayEventDetail<string | undefined>) => {
                if (data.role === DialogRoles.SELECT_DATE && data.data) {
                    const [date, time] = data.data.split('T');
                    const formattedDate = format(
                        parseISO(format(new Date(date), 'yyyy-MM-dd') + `T${time}`),
                        'MMM d, yyyy',
                    );
                    this.form.controls.birthDate.patchValue(formattedDate);
                }
            });
    }

    register(): void {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        const user: User = {
            firstName: this.form.value.firstName ?? '',
            lastName: this.form.value.lastName ?? '',
            birthDate: this.form.value.birthDate
                ? new Date(this.form.value.birthDate).toISOString()
                : new Date().toISOString(),
            email: this.form.value.email ?? '',
        };
        this._authenticationFacadeService.registerUser(user);
    }
}
