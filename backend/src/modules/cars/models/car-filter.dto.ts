import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { FuelType } from '../../../constants/fuel-type';
import { PowerMetric } from '../../../constants/power-type';
import { Transmission } from '../../../constants/transmission';

export class CarFilterDto {

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Page number',
    })
    @Type(() => Number)
    @IsNumber()
    page: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car\'s per page',
    })
    @Type(() => Number)
    @IsNumber()
    perPage: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Car\'s brand ID',
    })
    @Type(() => Number)
    @IsNumber()
    brandId: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Car\'s model ID',
    })
    @Type(() => Number)
    @IsNumber()
    modelId: number;

    @ApiProperty({
        type: String,
        required: false,
        description: 'Car\'s body style',
    })
    bodyStyle: string;

    @ApiProperty({
        enum: ['Gasoline', 'Diesel'],
        required: false,
        description: 'Car\'s fuel type',
    })
    fuelType: FuelType;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Year registration FROM',
    })
    @Type(() => Number)
    @IsNumber()
    yearRegistrationFrom: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Year registration TO',
    })
    @Type(() => Number)
    @IsNumber()
    yearRegistrationTo: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Price FROM',
    })
    @Type(() => Number)
    @IsNumber()
    priceFrom: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Price TO',
    })
    @Type(() => Number)
    @IsNumber()
    priceTo: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Kilometers travelled FROM',
    })
    @Type(() => Number)
    @IsNumber()
    kilometersTravelledFrom: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Kilometers travelled TO',
    })
    @Type(() => Number)
    @IsNumber()
    kilometersTravelledTo: number;

    @ApiProperty({
        enum: ['PS', 'KW'],
        required: false,
        description: 'Power metric',
    })
    powerMetric: PowerMetric;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Power FROM',
    })
    @Type(() => Number)
    @IsNumber()
    powerFrom: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Power TO',
    })
    @Type(() => Number)
    @IsNumber()
    powerTo: number;

    @ApiProperty({
        type: String,
        required: false,
        description: 'Type of transmission',
    })
    transmission: Transmission;
}