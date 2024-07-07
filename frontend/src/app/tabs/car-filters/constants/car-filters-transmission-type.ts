import { KeyValue } from '@angular/common';
import { TransmissionType } from '../../../models/transmission-type';

export const CAR_FILTERS_TRANSMISSION_TYPES: KeyValue<
    Lowercase<TransmissionType>,
    TransmissionType
>[] = [
    {
        key: 'automatic',
        value: 'Automatic',
    },
    {
        key: 'manual',
        value: 'Manual',
    },
];
