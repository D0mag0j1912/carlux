import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { EMPTY, map, switchMap, timer } from 'rxjs';
import { AuthenticationFacadeService } from '../auth-facade.service';

export function emailExistsValidator(): AsyncValidatorFn {
    const authenticationService = inject(AuthenticationFacadeService);
    return (control: AbstractControl<string>) =>
        timer(500).pipe(
            switchMap((_) => {
                if (control) {
                    const email = control.value;
                    if (!email) {
                        return EMPTY;
                    }
                    authenticationService.getEmailExists(email);
                    return authenticationService.selectEmailExists().pipe(
                        map((doesEmailExists: boolean) => {
                            if (!doesEmailExists) {
                                return { emailNotAvailable: true };
                            }
                            return null;
                        }),
                    );
                } else {
                    return EMPTY;
                }
            }),
        );
}
