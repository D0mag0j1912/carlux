import { CarDetailsDto as CarDetails } from '../../../api/models/car-details-dto';

export interface CarDetailsState {
    areCarDetailsLoading: boolean;
    carDetailsData: CarDetails | undefined;
}
