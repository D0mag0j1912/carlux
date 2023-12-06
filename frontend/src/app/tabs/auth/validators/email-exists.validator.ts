import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { EMPTY, map, switchMap, tap, timer } from 'rxjs';
import { AuthenticationFacadeService } from '../auth-facade.service';

export function emailExistsValidator(): AsyncValidatorFn {
    const authenticationFacadeService = inject(AuthenticationFacadeService);
    return (control: AbstractControl<string>) =>
        timer(500).pipe(
            switchMap((_) => {
                if (control) {
                    const email = control.value;
                    if (!email) {
                        return EMPTY;
                    }
                    authenticationFacadeService.getEmailExists(email);
                    return authenticationFacadeService.selectEmailExists().pipe(
                        tap((_) => control.markAsTouched()),
                        map((doesEmailExists: boolean) => {
                            if (doesEmailExists) {
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
