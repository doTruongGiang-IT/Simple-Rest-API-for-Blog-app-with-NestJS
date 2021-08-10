/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IsNotEmpty, IsEmail } from "class-validator";
import { Post } from "src/post/post.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    username: string;

    // @PrimaryColumn({unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column({default: ""})
    @IsNotEmpty()
    profile: string;

    @OneToMany(() => Post, (post: Post) => post.user)
    public posts: Post[];
}