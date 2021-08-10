/* eslint-disable prettier/prettier */
import { CategoryService } from './category.service';
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

@Controller('api/category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {};

    @Get()
    getAllCategory() {
        return this.categoryService.getAllCategory();
    };

    @Get(':id')
    getCategory(@Param('id') id: number) {
        return this.categoryService.getCategory(id);
    };

    @Post()
    createCategory(@Body('name') name: string) {
        return this.categoryService.insertCategory(name);
    };

    @Patch(':id')
    updateCategory(@Param('id') id: number, @Body('name') name: string) {
        return this.categoryService.updateCategory(id, name);
    };

    @Delete(':id')
    removeCategory(@Param('id') id: number) {
        return this.categoryService.deleteCategory(id);
    };
}
