/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { Users } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Post } from './post.entity';


@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {};

    async getAllPosts(): Promise<Post[]> {
        return await this.postRepository.find();
    };

    async getPost(id: number): Promise<Post> {
        const post = await this.postRepository.findOne(id);
        if(!post) throw new NotFoundException("Can't find this post");
        return post;
    };

    async insertPost(title: string, description: string, photo: string, user_id: number, category_id: number): Promise<any> {
        const today = new Date();
        const dd = String(today.getDate());
        const mm = String(today.getMonth() + 1); //January is 0!
        const yyyy = today.getFullYear();
        const created = mm + '/' + dd + '/' + yyyy;

        const newPost = {title, description, photo, user_id, category_id, created_on: created};
        await this.postRepository.save(newPost);
        return newPost;
    };  

    async updatePost(id: number,  title: string, description: string): Promise<Post> {
        const updatePost = await this.getPost(id);
        if(!updatePost) throw new NotFoundException("Can't find this post to update");
        if(title) updatePost.title = title;
        if(description) updatePost.description = description;
        await this.postRepository.save(updatePost)
        return updatePost;
    };

    async deletePost(id: number): Promise<void> {
        await this.postRepository.delete(id);
    };
}
