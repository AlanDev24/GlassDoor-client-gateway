import { Body, Controller, Inject, Patch, Post } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Auth, GetUser } from './decorators';
import { JwtPaylaod, ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send({ cmd: 'register_user' }, registerUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  loginUseer(@Body() loginUserDto: LoginUserDto) {
    return this.client.send({ cmd: 'login_user' }, loginUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  //* Ejemplo de como usar el auth decorator para proteger una ruta
  @Patch('edit')
  @Auth(ValidRoles.seller)
  editUser(@GetUser() user: JwtPaylaod) {
    return this.client.send({ cmd: 'edit_user' }, { user }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
