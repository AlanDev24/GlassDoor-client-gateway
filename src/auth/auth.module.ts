import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3001,
          host: 'localhost',
        },
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtStrategy,
  ],
})
export class AuthModule {}
