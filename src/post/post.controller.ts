/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/posts')
export class PostController {
    constructor(private postService: PostService) {};

    @Get()
    getAllPost() {
        return this.postService.getAllPosts();
    };

    @Get(':id')
    getPost(@Param('id') id: number) {
        return this.postService.getPost(id);
    };

    @Post()
    createPost(
        @Body('title') title: string, @Body('description') description: string, @Body('photo') photo: string, 
        @Body('user_id') user_id: number, @Body('category_id') category_id: number
    ) {
        return this.postService.insertPost(title, description, photo, user_id, category_id);
    };

    @Post('upload')
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './images/posts',
            filename: (req, file, cb) => {
                return cb(null, `${file.originalname}`);
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {name: file.originalname, filename: file.filename};
    };

    @Patch(':id')
    updatePost(@Param('id') id: number, @Body('title') title: string, @Body('description') description: string) {
        return this.postService.updatePost(id, title, description);
    };

    @Delete(':id')
    deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    };

}
