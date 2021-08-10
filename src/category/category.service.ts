/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {};

    async getAllCategory(): Promise<Category[]> {
        return await this.categoryRepository.find();
    };

    async getCategory(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne(id);
        if(!category) throw new NotFoundException("Can't find category");
        return category;
    };  

    async insertCategory(name: string): Promise<Category> {
        const newCategory = await this.categoryRepository.save({name});
        return newCategory;
    };

    async updateCategory(id: number, name: string): Promise<Category> {
        const updateCategory = await this.getCategory(id);
        if(!updateCategory) throw new NotFoundException("Can't find category to update");
        if(name) updateCategory.name = name;
        await this.categoryRepository.save(updateCategory);
        return updateCategory;
    };

    async deleteCategory(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    };
}
