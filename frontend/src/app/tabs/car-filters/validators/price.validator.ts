import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const priceFromValue = control.value.priceFrom;
        const priceToValue = control.value.priceTo;
        if (priceFromValue && priceToValue) {
            if (priceFromValue > priceToValue) {
                return { priceInvalid: true };
            }
            return null;
        }
        return null;
    };
}
