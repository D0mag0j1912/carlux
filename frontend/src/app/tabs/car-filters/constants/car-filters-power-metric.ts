import { KeyValue } from '@angular/common';

export type PowerUnit = 'PS' | 'KW';

export const CAR_FILTERS_POWER_UNITS: KeyValue<Lowercase<PowerUnit>, PowerUnit>[] = [
    {
        key: 'kw',
        value: 'KW',
    },
    {
        key: 'ps',
        value: 'PS',
    },
];
