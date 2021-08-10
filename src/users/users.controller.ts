/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) {};

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id);
    };

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        return this.userService.getUserAuth(email, password);
    };

    @Post('register')
    register(@Body('username') username: string, @Body('email') email: string, @Body('password') password: string, @Body('profile') profile: string) {
        return this.userService.createUser(username, email, password, profile);
    };

    @Post('upload')
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './images/profiles',
            filename: (_req, file, cb) => {
                return cb(null, `${file.originalname}`);
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {name: file.originalname, filename: file.filename};
    };

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body('username') username: string, @Body('email') email: string, @Body('password') password: string, @Body('profile') profile: string) {
        return this.userService.updateUser(id, username, email, password, profile);
    };

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    };
}
