import { KeyValue } from '@angular/common';
import { BodyStyles } from '../../../models/body-styles';

export const CAR_FILTERS_BODY_STYLES: KeyValue<Lowercase<BodyStyles>, BodyStyles>[] = [
    {
        key: 'convertible',
        value: 'Convertible',
    },
    {
        key: 'coupe',
        value: 'Coupe',
    },
    {
        key: 'sedan',
        value: 'Sedan',
    },
    {
        key: 'suv',
        value: 'SUV',
    },
    {
        key: 'hatchback',
        value: 'Hatchback',
    },
];
