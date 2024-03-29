import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh-token'),
            ignoreExpiration: false,
            secretOrKey: `${process.env.AUTH_SECRET_KEY}`,
        });
    }

    async validate(payload: any) {
        return { user: payload.sub, username: payload.username };
    }
}