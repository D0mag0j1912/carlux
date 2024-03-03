import { ApiProperty } from '@nestjs/swagger';
import { SellerType } from '../../../constants/seller-type';
import { BodyStyles } from '../../../constants/body-style';
import { WheelDrivesType } from '../../../constants/wheel-drive';

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
        type: String,
        required: true,
        description: 'Color',
    })
    color: string;

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
        description: 'How much fuel does the car consumes',
    })
    fuelConsumption: number;

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
        enum: ['AllWheelDrive', 'FrontWheelDrive', 'RearWheelDrive', 'FourWheelDrive'],
        required: true,
        description: 'Wheel drive type',
    })
    wheelDriveType: WheelDrivesType;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Currency code',
    })
    currencyCode: string;

    @ApiProperty({
        type: String,
        isArray: true,
        required: true,
        description: 'Images',
    })
    images: string[];
}
