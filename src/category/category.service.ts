import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<CategoryDocument>,
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async createCategory(req: any): Promise<string> {
        const { body } = req;
        try {
            if (body.parentId) body.parent = false;
            const category = await this.categoryRepository.createAndSave(body);

            // await this.userModel.findByIdAndUpdate(req.user._id, {
            //     $push: {
            //         categories: category
            //     }
            // })
            return 'Category created successfully';
        } catch (error) {
            return error;
        }
    }

    async insertMany(req: any): Promise<any> {
        try {
            const category = await this.categoryModel
                .insertMany(req.body)
                .then(() => console.log('success'))
                .catch(() => console.log('error'));
            return category;
        } catch (error) {
            return error;
        }
    }

    //     async getAllCategories(req: any) {
    //         const { user } = req;
    //         const option = { parent: true, active: true, deleted: false };
    //         if (req.query.categoryName)
    //             option.name = {
    //                 $regex: `.*${req.query.categoryName}.*`,
    //             };
    //         try {
    //             let page = parseInt(req.query.page, 10)
    //             let  size = parseInt(req.query.size, 10)
    //             const query = {}
    //             if (!page){
    //                 page = 1
    //             }
    //             if (!size){
    //                 size = 10
    //             }
    //             query.skip = size * (page - 1)
    //             query.limit = size

    //             const cate = await this.categoryModel.find(option).populate({
    //                 path: 'subCategory',
    //                 match: { deleted: false },
    //                 select: '-__v -enable -deleted -subCategory',
    //             })
    //             .populate({
    //                 path: 'subCategory.subCategory',
    //                 match: { deleted: false },
    //                 select: '-__v -enable -deleted -created_at -updated_at -subCategory',
    //             })
    //     }
    // }

    async getAllCategoryList(req: any) {
        const { query } = req;
        query.deleted = false;
        try {
            this.categoryModel
                .find({ query })
                .where('enable')
                .equals(true)
                .populate({
                    path: 'subCategory',
                    select: '-__v -enable -deleted -created_at ',
                    populate: [
                        {
                            path: 'subCategory',
                            select: '-__v -enable -deleted -created_at ',
                            populate: [
                                {
                                    path: 'subCategory',
                                    select: '-__v -enable -deleted -created_at ',
                                },
                            ],
                        },
                    ],
                })
                .sort({ name: 1 })
                .then((result) => console.log({ result, total: 0 }))
                .catch((err) => console.log(err));
        } catch (error) {
            return error;
        }
    }

    async getCategory(req: any, filter: any) {
        try {
            const category = await this.categoryModel.findOne(filter).populate({
                path: 'subCategory',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
                populate: [
                    {
                        path: 'subCategory',
                        select:
                            '-__v -enable -deleted -created_at -updated_at -subCategory',
                        populate: [
                            {
                                path: 'subCategory',
                                select:
                                    '-__v -enable -deleted -created_at -updated_at -subCategory',
                            },
                        ],
                    },
                ],
            });
            if (!category) return 'Category not found';

            return category;
        } catch (error) {
            return error;
        }
    }
    async updateCategoryById(req: any) {
        try {
            const { params, body } = req;
            const responseData = await this.categoryRepository.updateById(
                params.id,
                body,
            );

            return responseData;
        } catch (error) {
            return error;
        }
    }

    async updateCategoryItemById(req: any) {
        try {
            const { params, body } = req;
            if (body.price) {
                const category = await this.categoryRepository.getById(params.id);

                const data = {
                    previousPrice: category.price,
                };
                await this.categoryRepository.updateById(params.id, data);
            }
            const responseData = await this.categoryRepository.updateById(
                params.id,
                body,
            );
            return responseData;
        } catch (error) {
            return error;
        }
    }

    async deleteCategoryById(req: any) {
        try {
            const _id = req.params.id;
            const category = await this.categoryModel.findByIdAndDelete(_id);

            if (!category) return 'Category not found';
            return 'Category deleted successfully';
        } catch (error) {
            return error;
        }
    }
    async deleteAll(req: any) {
        try {
            const category = await this.categoryModel.deleteMany();
            if (!category) return 'Category not found';

            return 'Category deleted successfully';
        } catch (error) {
            return error;
        }
    }
    async deleteStatusCategoryById(req: any) {
        try {
            const _id = req.params.id;
            const category = await this.categoryModel.findByIdAndUpdate(
                _id,
                { deleted: true },
                { new: true, runValidators: true },
            );
            if (!category) return 'Category not found';
            return 'Category deleted successfully';
        } catch (error) {
            return error;
        }
    }

    async chnageCategoryStatusById(req: any) {
        try {
            const _id = req.params.id;
            const category = await this.categoryModel.findByIdAndUpdate(
                _id,
                { enable: false },
                { new: true, runValidators: true },
            );
            if (!category) return 'Category not found';
            return 'Category Status Changed Successfully';
        } catch (error) {
            return error;
        }
    }
    async assignSubCategory(req: any) {
        try {
            const category = await this.categoryRepository.assignSubCategories(
                req.body,
            );
            return category;
        } catch (error) {
            return error;
        }
    }

    async activtion(req: any) {
        try {
            const { params } = req;

            const category = await this.categoryModel.findOne({ _id: params.id });

            const data = {
                active: !category.active,
            };

            const responseData = await this.categoryModel.updateOne(
                { _id: params.id },
                { $set: data },
            );
            return responseData;
        } catch (error) {
            return error;
        }
    }
}
