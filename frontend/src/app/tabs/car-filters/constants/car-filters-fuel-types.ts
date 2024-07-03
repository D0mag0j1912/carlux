import { KeyValue } from '@angular/common';
import { FuelTypes } from '../../../models/fuel-types';

export const CAR_FILTERS_FUEL_TYPES: KeyValue<Lowercase<FuelTypes>, FuelTypes>[] = [
    {
        key: 'gasoline',
        value: 'Gasoline',
    },
    {
        key: 'diesel',
        value: 'Diesel',
    },
];
