import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS_SERVICE_GATEWAY } from 'src/config';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: CLIENTS_SERVICE_GATEWAY,
        transport: Transport.TCP,
        options: {
          port: 3002,
          host: 'localhost',
        },
      },
    ]),
  ],
})
export class UsersModule {}
