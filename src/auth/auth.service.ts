import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOneByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }else{
            throw new UnauthorizedException()
        }
    }

    async login(username: string, password: string) {
        const payload = await this.validateUser(username, password);

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {expiresIn: '7d'})
        };
    }

    async refreshToken(user: User) {
        const payload = {
            username: user.username,
            sub: user.id,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}