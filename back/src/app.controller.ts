import { Controller, Get, Request, Post, UseGuards, Put, Delete, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { EditUserData, User, UserData } from './users/user.class';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService) { }

  @Post('auth/register')
  register(@Body() body: User) {
    return this.usersService.register(body.login, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUser(@Request() req) {
    const user = this.usersService.get(req.user.login);
    return user.data;
  }

  @UseGuards(JwtAuthGuard)
  @Post('users')
  addUser(@Request() req, @Body() body: UserData) {
    return this.usersService.create(req.user.login, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('users')
  editUser(@Request() req, @Body() body: EditUserData) {
    return this.usersService.edit(req.user.login, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users')
  deleteUser(@Request() req) {
    return this.usersService.delete(req.user.login);
  }

}
