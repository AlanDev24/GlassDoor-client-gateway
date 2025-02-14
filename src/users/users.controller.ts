import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/auth/decorators';
import { CLIENTS_SERVICE_GATEWAY } from 'src/config';
import { ValidRoles } from './enums';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(CLIENTS_SERVICE_GATEWAY) private readonly usersClient: ClientProxy,
  ) {}

  @Get()
  @Auth(ValidRoles.admin)
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.usersClient.send({ cmd: 'find_users' }, paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersClient
      .send({ cmd: 'update_user' }, { id, updateUserDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
