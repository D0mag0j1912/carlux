import { ApiProperty } from '@nestjs/swagger';
import { SellerType } from '../../../constants/seller-type';
import { BodyStyles } from '../../../constants/body-style';
import { WheelDrivesType } from '../../../constants/wheel-drive';
import { Transmission } from '../../../constants/transmission';
import { FuelType } from '../../../constants/fuel-type';

export class CarDetailsDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'ID',
    })
    id: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Brand',
    })
    brand: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How many kilometers travelled',
    })
    kilometersTravelled: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Price',
    })
    price: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'First registration date',
    })
    firstRegistrationDate: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Date on which the model has been released to the public',
    })
    releaseDate: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Model name',
    })
    modelName: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Country origin',
    })
    countryOrigin: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Number of previous car owners',
    })
    noOfPreviousOwners: number;

    @ApiProperty({
        enum: ['Manual', 'Automatic'],
        required: true,
        description: 'Type of transmission',
    })
    transmission: Transmission;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Engine code name',
    })
    engineCodeName: string;

    @ApiProperty({
        enum: ['Gasoline', 'Diesel'],
        required: true,
        description: 'Fuel type',
    })
    fuelType: FuelType;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Exterior color',
    })
    exteriorColor: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Interior color',
    })
    interiorColor: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Bodykit',
    })
    bodyKit: string;

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
        description: 'Average fuel consumption',
    })
    fuelConsumptionCombined: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Fuel consumption in the city',
    })
    fuelConsumptionCity: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Fuel consumption on the highway',
    })
    fuelConsumptionHighway: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How many C02 emissions does the car have',
    })
    co2Emissions: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How many cylinders does the car have',
    })
    numberOfCylinders: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How much the car rim size is',
    })
    rimSize: number;

    @ApiProperty({
        enum: ['Dealer', 'Private', 'CompanyVehicle'],
        required: true,
        description: 'Seller type',
    })
    sellerType: SellerType;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Uploaded date',
    })
    uploadedDate: string;

    @ApiProperty({
        enum: ['Convertible', 'Coupe', 'Sedan', 'SUV', 'Hatchback'],
        required: true,
        description: 'Body style',
    })
    bodyStyle: BodyStyles;

    @ApiProperty({
        enum: ['FrontWheel', 'RearWheel', 'FourWheel'],
        required: true,
        description: 'Wheel drive type',
    })
    wheelDriveType: WheelDrivesType;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Currency code',
    })
    currencySymbol: string;

    @ApiProperty({
        type: String,
        isArray: true,
        required: true,
        description: 'Images',
    })
    images: string[];
}
