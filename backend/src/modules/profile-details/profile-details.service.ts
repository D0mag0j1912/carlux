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
            const user = await this._getProfileDetails(userId);
            return user;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async saveProfileDetails(profileDetails: UserDto): Promise<UserDto> {
        try {
            const user = await this._saveProfileDetails(profileDetails);
            return user;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    private async _getProfileDetails(userId: number): Promise<UserDto> {
        const user: UserEntity = await this._usersRepository.findOne({
            where: { Id: userId },
        });
        const userData: UserDto = {
            id: user.Id,
            firstName: user.FirstName,
            lastName: user.LastName,
            birthDate: user.BirthDate,
            email: user.Email,
            createdAt: user.CreatedAt,
            avatar: user.Avatar,
        };
        return userData;
    }

    private async _saveProfileDetails(profileDetails: UserDto): Promise<UserDto> {
        const userEntity: UserEntity = {
            BirthDate: profileDetails.birthDate,
            Email: profileDetails.email,
            FirstName: profileDetails.firstName,
            Id: profileDetails.id,
            LastName: profileDetails.lastName,
            CreatedAt: profileDetails.createdAt,
            Avatar: profileDetails.avatar ? profileDetails.avatar : null,
        };
        const savedUser = await this._usersRepository.save(userEntity);
        return {
            birthDate: savedUser.BirthDate,
            email: savedUser.Email,
            firstName: savedUser.FirstName,
            id: savedUser.Id,
            lastName: savedUser.LastName,
            avatar: savedUser.Avatar,
        } as UserDto;
    }
}
