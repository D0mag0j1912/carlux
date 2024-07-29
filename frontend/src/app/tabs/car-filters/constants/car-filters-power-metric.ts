import { KeyValue } from '@angular/common';

export type PowerUnit = 'PS' | 'KW';

export const CAR_FILTERS_POWER_UNITS: KeyValue<PowerUnit, PowerUnit>[] = [
    {
        key: 'KW',
        value: 'KW',
    },
    {
        key: 'PS',
        value: 'PS',
    },
];
