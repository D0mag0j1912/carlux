import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BASE_URL } from '../../constants/base-url';
import { CarsService } from './cars.service';

const CARS_FEATURE_KEY = 'cars';

@ApiTags('Car list')
@Controller(`${BASE_URL}${CARS_FEATURE_KEY}`)
export class CarsController {
    constructor(private _carsService: CarsService) {}
}
