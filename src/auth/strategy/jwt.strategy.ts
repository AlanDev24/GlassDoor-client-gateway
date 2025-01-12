import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPaylaod } from '../interfaces';
import { envs } from 'src/config';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    });
  }

  async validate(payload: JwtPaylaod) {
    const { email, isActive } = payload;

    if (!email) {
      throw new NotFoundException('User not found');
    }


    if (!isActive) {
      throw new UnauthorizedException('This user is inactive');
    }

    // Si todo está bien, devolver el payload con el correo electrónico
    return payload
  }
}
