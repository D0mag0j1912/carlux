import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { delay, map, switchMap, take, tap, timer, withLatestFrom } from 'rxjs';
import { AuthenticationFacadeService } from '../auth-facade.service';
import { AuthenticationEventEmitterService } from '../event-emitter/auth-event-emitter.service';

export function emailExistsValidator(): AsyncValidatorFn {
    const authenticationFacadeService = inject(AuthenticationFacadeService);
    const authenticationEventEmitterService = inject(AuthenticationEventEmitterService);
    return (control: AbstractControl<string>) =>
        timer(500).pipe(
            switchMap((_) => {
                const email = control.value;
                authenticationFacadeService.getEmailExists(email);
                return authenticationEventEmitterService.getEmailExistsSuccess().pipe(
                    delay(0),
                    tap((_) => control.markAsTouched()),
                    withLatestFrom(authenticationFacadeService.selectEmailExists()),
                    map(([_, doesEmailExists]: [void, boolean]) => {
                        if (doesEmailExists) {
                            return { emailNotAvailable: true };
                        }
                        return null;
                    }),
                    take(1),
                );
            }),
        );
}
