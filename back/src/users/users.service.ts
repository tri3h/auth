import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.class';

@Injectable()
export class UsersService {
    private users: User[] = [];

    register(login: string, pass: string): string {
        let doesUserExist = this.users.findIndex(value => value.login === login) !== -1
        if (doesUserExist) throw new BadRequestException('Пользователь уже зарегистрирован');
        else {
            let newUser = {
                login: login,
                password: pass,
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

    addData(login: string, data) {
        const user = this.findUser(login);
        if (!this.isDataFilled(login)) {
            for (let key in user.data) {
                user.data[key] = data[key];
            }
        } else {
            throw new BadRequestException("Пользователь уже создан");
        }
    }

    findUser(login: string): User | undefined {
        return this.users.find(user => user.login === login);
    }

    isDataFilled(login: string): boolean {
        return this.findUser(login).data.name != null;
    }

    getData(login: string) : User {
        const user = this.findUser(login);
        if (user.data.name == null) {
            throw new NotFoundException('Профиль еще не заполнен');
        } else {
            return user;
        }
    }

    editData(login: string, data) {
        const user = this.findUser(login);
        if (this.isDataFilled(login)) {
            for (let key in user.data) {
                if (data.hasOwnProperty(key)) {
                    user.data[key] = data[key];
                }
            }
        } else {
            throw new BadRequestException("Пользователь еще не создан");
        }
    }

    deleteData(login: string): void {
        const user = this.findUser(login);
        for (let key in user.data) {
            user.data[key] = null;
        }
    }

}