import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.class';

@Injectable()
export class UsersService {
    private users: User[] = [];

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

    createEmpty(login: string, password: string) {
        const newUser = {
            login: login,
            password: password,
            data: {
                name: null,
                address: null,
                phone: null,
                info: null
            }
        }
        this.users.push(newUser);
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