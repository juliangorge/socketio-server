import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async findOneByUsername(username: string) {
        return await this.userRepository.findOne({ where: { username: username } });
    }

    async findOne(id: number) {
        return await this.userRepository.findOne({ where: { id: id }});
    }
}
