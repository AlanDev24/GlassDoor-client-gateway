import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces'; 
import { envs } from 'src/config';
import { NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { email, isActive, roles } = payload;

    if (!email) {
      throw new NotFoundException('User not found');
    }

    if (!isActive) {
      throw new UnauthorizedException('This user is inactive');
    }

    if (!roles || roles.length === 0) {
      throw new BadRequestException('User does not have assigned roles');
    }

    return payload; 
  }
}
