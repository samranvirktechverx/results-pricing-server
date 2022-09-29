import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../entities/category.entity';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
    ) { }

    async save(req: any): Promise<any> {
        const category = new this.CategoryModel(req);
        const responseData = await category.save();

        if (req.parentId) {
            await this.CategoryModel.findByIdAndUpdate(
                req.parentId,
                {
                    $addToSet: {
                        subCategory: responseData._id,
                    },
                },
                {
                    new: true,
                    useFindAndModify: false,
                },
            );
        }

        return responseData;
    }

    async createAndSave(req: any): Promise<any> {
        return this.save(req);
    }

    async assignSubCategories(reqBody: any): Promise<any> {
        await this.CategoryModel.findByIdAndUpdate(
            reqBody.categoryId,
            {
                $set: {
                    subCategory: [],
                },
            },
            {
                new: true,
                useFindAndModify: false,
            },
        );
        return this.CategoryModel.findByIdAndUpdate(
            reqBody.categoryId,
            {
                $addToSet: {
                    subCategory: {
                        $each: reqBody.subCategory,
                    },
                },
            },
            {
                new: true,
                useFindAndModify: false,
            },
        );
    }

    async updateById(body: any, key: any){

        body.updated_at = Date.now();

        return this.CategoryModel.updateOne(
            {
                _id: key,
            },
            {
                $set: body,
            },
        );
    }

    async getById(key: any): Promise<any> {
        return this.CategoryModel.findById(key);
    }
}
