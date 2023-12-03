import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { format, parseISO } from 'date-fns';
import { from } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTimePickerComponent } from '../../../../shared/datetime-picker/datetime-picker.component';
import { DialogRoles } from '../../../../constants/dialog-roles';
import { AuthenticationFacadeService } from '../../auth-facade.service';
import { User } from '../../../../api/models/user';
import { AuthenticationEventEmitterService } from '../../event-emitter/auth-event-emitter.service';

@Component({
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, TranslocoModule, DateTimePickerComponent],
    templateUrl: './personal-information-dialog.component.html',
    styleUrls: ['./personal-information-dialog.component.scss'],
})
export class PersonalInformationDialogComponent implements OnInit {
    private _authenticationEventEmitterService = inject(AuthenticationEventEmitterService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);
    private _modalController = inject(ModalController);
    private _destroyRef = inject(DestroyRef);
    private _navController = inject(NavController);

    readonly MAX_CHARACTERS = 100;
    readonly DATE_FORMAT = `yyyy-MM-dd'T'HH:mm:ss'Z'`;

    form = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        birthDate: new FormControl<string | undefined>('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    ngOnInit(): void {
        this._authenticationEventEmitterService
            .getRegistrationSuccess()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(async (_) => {
                await this._modalController.dismiss();
                await this._navController.navigateForward('tabs/marina-list');
            });
    }

    async onOpenDatetimePicker(): Promise<void> {
        const modal = await this._modalController.create({
            component: DateTimePickerComponent,
            componentProps: {
                dateValue: format(new Date(), this.DATE_FORMAT),
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
            FirstName: this.form.value.firstName ?? '',
            LastName: this.form.value.lastName ?? '',
            BirthDate: this.form.value.birthDate ?? new Date().toISOString(),
            Email: this.form.value.email ?? '',
        };
        this._authenticationFacadeService.registerUser(user);
    }
}
