import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { AUTH_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authClient.send({ cmd: 'register_user' }, registerUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  loginUseer(@Body() loginUserDto: LoginUserDto) {
    return this.authClient.send({ cmd: 'login_user' }, loginUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  

  //* Ejemplo de como usar el auth decorator para proteger una ruta
  // @Patch('edit')
  // @Auth(ValidRoles.seller)
  // editUser(@GetUser() user: JwtPaylaod) {
  //   return this.client.send({ cmd: 'edit_user' }, { user }).pipe(
  //     catchError((err) => {
  //       throw new RpcException(err);
  //     }),
  //   );
  // }
}
