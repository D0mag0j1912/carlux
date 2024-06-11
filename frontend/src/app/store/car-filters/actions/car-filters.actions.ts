import { createAction, props } from '@ngrx/store';
import { CarBrandDto as CarBrand } from '../../../api/models/car-brand-dto';

export const getCarBrands = createAction('[Car Filters] Get Car Brands');

export const setCarBrands = createAction(
    '[Car Filters] Set Car Brands',
    props<{ carBrands: CarBrand[] }>(),
);
