import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function registrationYearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const registrationYearFromValue = control.value.registrationYearFrom;
        const registrationYearToValue = control.value.registrationYearTo;
        if (registrationYearFromValue && registrationYearToValue) {
            if (registrationYearFromValue > registrationYearToValue) {
                return { registrationYearInvalid: true };
            }
            return null;
        }
        return null;
    };
}
