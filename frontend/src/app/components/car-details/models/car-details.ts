import { CarDetailsDto as CarDetailsData } from '../../../api/models/car-details-dto';

export interface CarDetails {
    areCarDetailsLoading: boolean;
    carDetailsData: CarDetailsData | undefined;
}
