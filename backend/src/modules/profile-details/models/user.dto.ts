import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'User\'s ID',
    })
    id: number;

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
}