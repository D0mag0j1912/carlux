import { ApiProperty } from '@nestjs/swagger';
import { FuelType } from '../../../constants/fuel-type';
import { SellerType } from '../../../constants/seller-type';
import { TransmissionType } from '../../../constants/transmission-type';

export class FavouritesDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car\'s ID',
    })
    id: number;

    @ApiProperty({
        type: String,
        isArray: true,
        required: true,
        description: 'Car\'s images',
    })
    images: string[];

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car suggested price',
    })
    price: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Currency symbol',
    })
    currencySymbol: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car brand',
    })
    brand: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car model name',
    })
    modelName: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Kilometers travelled since the first registration date',
    })
    kilometersTravelled: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How many horse power does the car have',
    })
    horsePower: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How many kilowatts does the car have',
    })
    kilowatts: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Number of previous car owners',
    })
    noOfPreviousOwners: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Average fuel consumption',
    })
    fuelConsumptionCombined: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'First registration date',
    })
    firstRegistrationDate: string;

    @ApiProperty({
        enum: ['Manual', 'Automatic'],
        required: true,
        description: 'Type of transmission',
    })
    transmission: TransmissionType;

    @ApiProperty({
        enum: ['Gasoline', 'Diesel'],
        required: true,
        description: 'Fuel type',
    })
    fuelType: FuelType;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How many C02 emissions does the car have',
    })
    co2Emissions: number;

    @ApiProperty({
        enum: ['Dealer', 'Private', 'CompanyVehicle'],
        required: true,
        description: 'Seller type',
    })
    sellerType: SellerType;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Country origin',
    })
    countryOrigin: string;
}
