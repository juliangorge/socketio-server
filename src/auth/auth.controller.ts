import { Controller, Request, Body, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard, Public } from './guard/jwt-auth.guard';
import { RefreshJwtGuard } from './guard/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //@UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Body() req: { username: string, password: string }) {
        return this.authService.login(req.username, req.password);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh-token')
    refreshToken(@Request() req: any) {
        return this.authService.refreshToken(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
