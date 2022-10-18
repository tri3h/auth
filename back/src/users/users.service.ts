import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.class';

@Injectable()
export class UsersService {
    private users: User[] = [];

    register(login: string, password: string): string {
        const doesUserExist = this.users.findIndex(value => value.login === login) !== -1;
        if (doesUserExist) {
            throw new BadRequestException('Пользователь уже зарегистрирован');
        }
        else {
            const newUser = {
                login: login,
                password: password,
                data: {
                    name: null,
                    address: null,
                    phone: null,
                    info: null
                }
            };
            this.users.push(newUser);
            return 'Регистрация успешна';
        }
    }

    create(login: string, data) {
        const user = this.get(login);
        if (!this.isFilled(login)) {
            for (let key in user.data) {
                user.data[key] = data[key];
            }
            return user.data;
        } else {
            throw new BadRequestException("Пользователь уже создан");
        }
    }

    get(login: string): User | undefined {
        return this.users.find(user => user.login === login);
    }

    isFilled(login: string): boolean {
        return this.get(login).data.name != null;
    }

    edit(login: string, data) {
        const user = this.get(login);
        if (this.isFilled(login)) {
            for (let key in user.data) {
                if (data.hasOwnProperty(key)) {
                    user.data[key] = data[key];
                }
            }
            return user.data;
        } else {
            throw new BadRequestException("Пользователь еще не создан");
        }
    }

    delete(login: string): void {
        const user = this.get(login);
        for (let key in user.data) {
            user.data[key] = null;
        }
    }

}