import { ApiProperty } from '@nestjs/swagger';
import { TypeOfOwnership } from '../../../constants/type-of-ownership';

export class RecommendedCarsDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car ID',
    })
    id: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car brand',
    })
    brand: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Kilometers travelled since the first registration date',
    })
    kilometersTravelled: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car suggested price',
    })
    price: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Date on which the car is registered for the first time',
    })
    firstRegistrationDate: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car model name',
    })
    modelName: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Country from which the car originates',
    })
    countryOrigin: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Number of previous owners',
    })
    noOfPreviousOwners: number;

    @ApiProperty({
        enum: ['Dealer', 'Private'],
        required: true,
        description: 'Type of ownership',
    })
    typeOfOwnership: TypeOfOwnership;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Currency symbol',
    })
    currencySymbol: string;

    @ApiProperty({
        type: String,
        isArray: true,
        required: true,
        description: 'Car images',
    })
    images: string[];
}
