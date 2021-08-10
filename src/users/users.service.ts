/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {};

    async getUser(id: number): Promise<Users> {
        const user = await this.usersRepository.findOne(id);
        if(!user) throw new NotFoundException("Can't find this user");
        return user;
    };

    async getUserAuth(email: string, pass: string): Promise<any> {
        const users = await this.usersRepository.find();
        const user = await users.find((user) => user.email === email);
        if(!user) throw new NotFoundException("Can't find this user");
        const validate = await bcrypt.compare(pass, user.password);
        if(!validate) throw new NotFoundException("Wrong credentials");
        const {password, ...rest} = user;
        return rest;
    };

    async createUser(username: string, email: string, password: string, profile: string): Promise<Users> {
        const saltOrRounds = 10;
        const hashedPass = await bcrypt.hash(password, saltOrRounds);

        const newUser = {username, email, password: hashedPass, profile};
        const users = await this.usersRepository.find();
        const user = await users.find((user) => user.email === email);
        if(user) {
            throw new HttpException("Email is already used", 400);
        }else {
            return await this.usersRepository.save(newUser);
        };
    };

    async updateUser(id: number, username: string, email: string, password: string, profile: string): Promise<Users> {
        const updateUser = await this.getUser(id);
        if(!updateUser) throw new NotFoundException("Can't find this user to update");
        if(username) updateUser.username = username;
        if(email) updateUser.email = email;
        if(password) updateUser.password = password;
        if(profile) updateUser.profile = profile;
        await this.usersRepository.save(updateUser);
        return updateUser;
    };

    async deleteUser(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    };
}
