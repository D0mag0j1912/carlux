import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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
        required: false,
        description: 'Car\'s brand ID',
    })
    @Type(() => Number)
    @IsNumber()
    brandId?: number;

    @ApiPropertyOptional({
        type: [Number],
        required: false,
        description: 'Car\'s model ID',
    })
    @Type(() => Number)
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    @IsArray()
    @IsNumber({}, { each: true })
    modelIds?: number[] | undefined;

    @ApiPropertyOptional({
        enum: ['Convertible', 'Coupe', 'Sedan', 'SUV', 'Hatchback'],
        required: false,
        isArray: true,
        description: 'Car\'s body style',
    })
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    @IsArray()
    bodyStyles?: BodyStyles[] | undefined;

    @ApiPropertyOptional({
        enum: ['Gasoline', 'Diesel'],
        required: false,
        isArray: true,
        description: 'Car\'s fuel type',
    })
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    @IsArray()
    fuelTypes?: FuelType[] | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Year registration FROM',
    })
    @Type(() => Number)
    @IsNumber()
    yearRegistrationFrom?: number | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Year registration TO',
    })
    @Type(() => Number)
    @IsNumber()
    yearRegistrationTo?: number | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Price FROM',
    })
    @Type(() => Number)
    @IsNumber()
    priceFrom?: number | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Price TO',
    })
    @Type(() => Number)
    @IsNumber()
    priceTo?: number | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Kilometers travelled FROM',
    })
    @Type(() => Number)
    @IsNumber()
    kilometersTravelledFrom?: number | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Kilometers travelled TO',
    })
    @Type(() => Number)
    @IsNumber()
    kilometersTravelledTo?: number | undefined;

    @ApiPropertyOptional({
        enum: ['PS', 'KW'],
        required: false,
        description: 'Power metric',
    })
    powerMetric?: PowerMetric | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Power FROM',
    })
    @Type(() => Number)
    @IsNumber()
    powerFrom?: number | undefined;

    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'Power TO',
    })
    @Type(() => Number)
    @IsNumber()
    powerTo?: number | undefined;

    @ApiPropertyOptional({
        enum: ['Automatic', 'Manual'],
        required: false,
        isArray: true,
        description: 'Type of transmission',
    })
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    @IsArray()
    transmissionTypes?: TransmissionType[] | undefined;
}
