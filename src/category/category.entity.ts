/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Post } from "src/post/post.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @OneToMany(() => Post, (post: Post) => post.category)
    public posts: Post[];
};