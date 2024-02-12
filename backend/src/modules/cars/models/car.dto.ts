import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
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
        description: 'Date on which the model of the car first came out',
    })
    releaseDate: string;

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
        type: String,
        required: true,
        description: 'Car color',
    })
    color: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Car body kit',
    })
    bodyKit: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How much horse power the car has',
    })
    horsePower: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'How much kilowats the car has',
    })
    kilowats: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car fuel consumption',
    })
    fuelConsumption: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car CO2 emissions',
    })
    co2Emissions: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Number of the car cylinders',
    })
    numberOfCylinders: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car rim size',
    })
    rimSize: number;
}
