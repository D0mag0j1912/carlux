import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
    @ApiPropertyOptional({
        type: Number,
        required: false,
        description: 'User\'s ID',
    })
    id?: number;

    @ApiProperty({
        type: String,
        required: true,
        description: 'User\'s first name',
    })
    firstName: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'User\'s last name',
    })
    lastName: string;

    @ApiPropertyOptional({
        type: String,
        required: false,
        description: 'User\'s profile picture',
    })
    avatar?: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'User\'s birth date',
    })
    birthDate: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'User\'s email',
    })
    email: string;

    @ApiPropertyOptional({
        type: String,
        required: false,
        description: 'Date and time when the user was created',
    })
    createdAt?: string;
}