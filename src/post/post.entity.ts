/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsDate } from "class-validator";
import { Category } from "src/category/category.entity";
import { Users } from "src/users/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsNotEmpty()
    photo: string;

    @Column()
    @IsNotEmpty()
    user_id: number;

    @Column()
    @IsNotEmpty()
    category_id: number;

    @Column()
    @IsNotEmpty()
    @IsDate()
    created_on: Date;

    @IsNotEmpty()
    @ManyToOne(() => Users, (author: Users) => author.posts, {onDelete: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user: Users;

    @IsNotEmpty()
    @ManyToOne(() => Category, (category: Category) => category.posts, {onDelete: "CASCADE"})
    @JoinColumn({ name: "category_id" })
    category: Category;
}