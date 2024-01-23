import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entity/user.entity';
import { UserDto } from './models/user.dto';

@Injectable()
export class ProfileDetailsService {
    constructor(@InjectRepository(UserEntity) private _usersRepository: Repository<UserEntity>) {}

    async getProfileDetails(userId: number): Promise<UserDto> {
        try {
            const user: UserEntity = await this._usersRepository.findOne({
                where: { Id: userId },
            });
            const userData: UserDto = {
                id: user.Id,
                firstName: user.FirstName,
                lastName: user.LastName,
                birthDate: user.BirthDate,
                email: user.Email,
            };
            return userData;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
