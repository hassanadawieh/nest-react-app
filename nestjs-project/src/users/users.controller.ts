import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.userService.createUser(body.name, body.email, body.password);
  }
}
