import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send({ cmd: 'register_user' }, registerUserDto);
  }

  @Post('login')
  loginUseer(){
    return this.client.send({cmd: 'login_user'}, {})
  }
}
