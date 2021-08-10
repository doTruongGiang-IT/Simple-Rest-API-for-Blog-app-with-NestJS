/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Category } from "./category/category.entity";
import { Post } from "./post/post.entity";
import { Users } from './users/user.entity';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'uocgitrungso_1',
    database: 'nest_blog',
    entities: [Category, Users, Post],
    synchronize: true,
};