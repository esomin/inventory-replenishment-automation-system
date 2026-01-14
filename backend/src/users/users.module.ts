import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../entities/User';
import { Role } from '../entities/Role';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
