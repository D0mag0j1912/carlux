import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { EMPTY, map, switchMap, timer } from 'rxjs';
import { AuthenticationFacadeService } from '../auth-facade.service';

export function isEmailAvailable(): AsyncValidatorFn {
    const authenticationService = inject(AuthenticationFacadeService);
    return (control: AbstractControl<string>) =>
        timer(500).pipe(
            switchMap((_) => {
                if (control) {
                    const email = control.value;
                    if (!email) {
                        return EMPTY;
                    }
                    authenticationService.getIsEmailAvailable(email);
                    return authenticationService.selectIsEmailAvailable().pipe(
                        map((isEmailAvailable: boolean) => {
                            if (!isEmailAvailable) {
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
