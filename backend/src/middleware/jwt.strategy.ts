import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JWT_TOKEN } from '../modules/auth/constants/jwt.constants';
import { JwtPayloadDto } from '../modules/auth/models/jwt-payload.dto';
import { UserEntity } from '../modules/auth/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>) {
        super({
            secretOrKey: JWT_TOKEN,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayloadDto): Promise<boolean> {
        const user = await this._userRepository.find({
            select: { Email: true },
            where: { Email: payload.email },
        });
        if (!user) {
            throw new UnauthorizedException('Not authenticated');
        }
        return !!user.length;
    }
}
