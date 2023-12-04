import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { EMPTY, map, switchMap, timer } from 'rxjs';
import { AuthenticationFacadeService } from '../auth-facade.service';

export function isEmailAvailable(
    authenticationFacadeService: AuthenticationFacadeService,
): AsyncValidatorFn {
    return (control: AbstractControl<string>) =>
        timer(500).pipe(
            switchMap((_) => {
                if (control) {
                    const email = control.value;
                    if (!email) {
                        return EMPTY;
                    }
                    return authenticationFacadeService.selectIsEmailAvailable().pipe(
                        map((isEmailAvailable: boolean) => {
                            if (!isEmailAvailable) {
                                return { isEmailAvailable: true };
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
