import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/entity/user.entity';
import { ProfileDetailsController } from './profile-details.controller';
import { ProfileDetailsService } from './profile-details.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [ProfileDetailsController],
    providers: [ProfileDetailsService],
})
export class ProfileDetailsModule {}
