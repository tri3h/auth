import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async register(login: string, password: string): Promise<string> {
    const doesUserExist = typeof this.usersService.get(login) != 'undefined';
    if (doesUserExist) {
      throw new BadRequestException('Пользователь уже зарегистрирован');
    }
    else {
      this.usersService.createEmpty(login, await this.hashPassword(password));
      return 'Регистрация успешна';
    }
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.get(login);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}