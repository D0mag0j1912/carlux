import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNeverCheck } from '../../../helpers/is-never-check';

type CarFiltersFormValidationType = 'registrationYear' | 'price' | 'kilometersTravelled' | 'power';

export function carFiltersFormValidator(
    carFiltersFormValidationType: CarFiltersFormValidationType,
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        switch (carFiltersFormValidationType) {
            case 'registrationYear': {
                const registrationYearFromValue = control.value.registrationYearFrom;
                const registrationYearToValue = control.value.registrationYearTo;
                if (registrationYearFromValue && registrationYearToValue) {
                    if (registrationYearFromValue > registrationYearToValue) {
                        return { registrationYearInvalid: true };
                    }
                    return null;
                }
                return null;
            }
            case 'price': {
                const priceFromValue = control.value.priceFrom;
                const priceToValue = control.value.priceTo;
                if (priceFromValue && priceToValue) {
                    if (priceFromValue > priceToValue) {
                        return { priceInvalid: true };
                    }
                    return null;
                }
                return null;
            }
            case 'kilometersTravelled': {
                const kilometersFromValue = control.value.kilometersFrom;
                const kilometersToValue = control.value.kilometersTo;
                if (kilometersFromValue && kilometersToValue) {
                    if (kilometersFromValue > kilometersToValue) {
                        return { kilometersTravelledInvalid: true };
                    }
                    return null;
                }
                return null;
            }
            case 'power': {
                const powerFrom = control.value.powerFrom;
                const powerTo = control.value.powerTo;
                if (powerFrom && powerTo) {
                    if (powerFrom > powerTo) {
                        return { powerInvalid: true };
                    }
                    return null;
                }
                return null;
            }
            default: {
                isNeverCheck(carFiltersFormValidationType);
            }
        }
    };
}
