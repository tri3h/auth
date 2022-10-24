import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(login: string, password: string) {
        return await this.usersRepository.save({
            login: login,
            password: password
        });
    }

    async getData(userLogin: string) {
        const { id, login, password, ...user } = await this.get(userLogin);
        return user;
    }

    async addData(login: string, data) {
        if (!await this.isFilled(login)) {
            const { id, ...result } = await this.usersRepository.save({
                id: await this.getID(login),
                name: data.name,
                phone: data.phone,
                address: data.address,
                info: data.info
            })
            return result;
        } else {
            throw new BadRequestException("Пользователь уже создан");
        }
    }

    async updateData(login: string, data) {
        if (await this.isFilled(login)) {
            const { id, ...result } = await this.usersRepository.save({
                id: await this.getID(login),
                name: data.name,
                phone: data.phone,
                address: data.address,
                info: data.info
            })
            return result;
        } else {
            throw new BadRequestException("Пользователь еще не создан");
        }
    }

    async removeData(login: string) {
        this.usersRepository.save({
            id: await this.getID(login),
            name: null,
            phone: null,
            address: null,
            info: null
        })
    }

    async get(login: string): Promise<User> {
        return await this.usersRepository.findOneBy({ login: login });
    }

    async getID(login: string): Promise<number> {
        const { id, ...arg } = await this.get(login);
        return id;
    }

    async isFilled(login: string): Promise<boolean> {
        return (await this.get(login)).name != null;
    }
}