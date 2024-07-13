import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';
import { BodyStyles } from '../../../constants/body-style';
import { FuelType } from '../../../constants/fuel-type';
import { PowerMetric } from '../../../constants/power-type';
import { TransmissionType } from '../../../constants/transmission-type';

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

    @ApiPropertyOptional({
        type: [Number],
        required: false,
        description: 'Car\'s model ID',
    })
    @IsArray()
    modelIds?: number[];

    @ApiPropertyOptional({
        enum: ['Convertible', 'Coupe', 'Sedan', 'SUV', 'Hatchback'],
        required: false,
        isArray: true,
        description: 'Car\'s body style',
    })
    @IsArray()
    bodyStyles?: BodyStyles[];

    @ApiPropertyOptional({
        enum: ['Gasoline', 'Diesel'],
        required: false,
        isArray: true,
        description: 'Car\'s fuel type',
    })
    @IsArray()
    fuelTypes?: FuelType[];

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Year registration FROM',
    })
    @Type(() => Number)
    @IsNumber()
    yearRegistrationFrom?: number;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Year registration TO',
    })
    @Type(() => Number)
    @IsNumber()
    yearRegistrationTo?: number;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Price FROM',
    })
    @Type(() => Number)
    @IsNumber()
    priceFrom?: number;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Price TO',
    })
    @Type(() => Number)
    @IsNumber()
    priceTo?: number;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Kilometers travelled FROM',
    })
    @Type(() => Number)
    @IsNumber()
    kilometersTravelledFrom?: number;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Kilometers travelled TO',
    })
    @Type(() => Number)
    @IsNumber()
    kilometersTravelledTo?: number;

    @ApiPropertyOptional({
        enum: ['PS', 'KW'],
        required: false,
        description: 'Power metric',
    })
    powerMetric?: PowerMetric;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Power FROM',
    })
    @Type(() => Number)
    @IsNumber()
    powerFrom?: number;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Power TO',
    })
    @Type(() => Number)
    @IsNumber()
    powerTo?: number;

    @ApiPropertyOptional({
        enum: ['Automatic', 'Manual'],
        required: false,
        isArray: true,
        description: 'Type of transmission',
    })
    @IsArray()
    transmissionTypes?: TransmissionType[];
}
