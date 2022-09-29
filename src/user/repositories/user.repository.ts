import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from '@root/user/dtos/create-user.dto';
import { GetLengthUserDto } from '@root/user/dtos/length-user.dto';
import { User, UserDocument } from '@root/user/entities/user.entity';
import { Option } from '@root/common/types/option.interface';
import { QueryDTO } from '@root/user/dtos/query.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = await this.userModel.create(createUserDTO);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser.save();
    }

    async findUser(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }

    async findUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        return user;
    }

    async deleteUser(userId: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndRemove(userId);
        return deletedUser;
    }

    async updateUser(
        userId: string,
        updateUserDTO: CreateUserDTO,
    ): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            userId,
            updateUserDTO,
            { new: true },
        );
        return updatedUser;
    }

    async createAndSave(createUserDTO: CreateUserDTO): Promise<UserDocument> {
        const user = new this.userModel(createUserDTO);
        return user.save();
    }

    async getByType(type: string): Promise<User[]> {
        return this.userModel.find({ type: type });
    }

    async getLength(user: GetLengthUserDto, query: QueryDTO): Promise<number> {
        const option: Option = {
            clientManagerId: user._id,
            type: query.type,
            firstName: query.firstName,
        };
        if (user.type == 'clientManager') option.clientManagerId = user._id;
        if (user.type == 'admin') option.type = 'clientManager';
        if (query.type) option.type = query.type;
        if (query.firstName)
            option.firstName = {
                $regex: `.*${query.firstName}.*`,
            };

        if (query.type == undefined && query.firstName == undefined) {
            return await this.userModel.countDocuments({ clientManagerId: user._id });
        } else if (query.type == undefined) {
            return await this.userModel.countDocuments({
                clientManagerId: user._id,
                firstName: query.firstName,
            });
        } else if (query.firstName == undefined) {
            return await this.userModel.countDocuments({
                clientManagerId: user._id,
                type: query.type,
            });
        } else {
            let length = await this.userModel.find(option).countDocuments();
            return length;
        }
    }

    async getAll(user: GetLengthUserDto, query: any, body: any): Promise<UserDocument[]> {
        const option: Option = {
            clientManagerId: user._id,
            type: query.type,
            firstName: query.firstName,
        };

        let sort = {};

        if (user.type == 'clientManager') option.clientManagerId = user._id;
        if (user.type == 'admin') option.type = 'clientManager';
        if (query.type) option.type = query.type;
        if (query.firstName)
            option.firstName = {
                $regex: `.*${query.firstName}.*`,
            };
        let options;
        if (query.type == undefined && query.firstName == undefined) {
            options = {
                clientManagerId: user._id,
            };
        } else if (query.type == undefined) {
            options = {
                clientManagerId: user._id,
                firstName: query.firstName,
            };
        } else if (query.firstName == undefined) {
            options = {
                clientManagerId: user._id,
                type: query.type,
            };
        } else {
            options = option;
        }

        if (body.sort && Object.keys(body.sort).length !== 0)
            sort = {
                ...body.sort,
            };
        const page = parseInt(query.page, 10) || 1;
        const size = parseInt(query.size, 10) || 10;
        query = {};
        query.skip = size * (page - 1);
        query.limit = size;
        let users = await this.userModel
            .find(options, {}, query)

            .populate({
                path: 'categories.category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'templates',
                select: '-__v -enable',
            })
            .populate({
                path: 'categories.sub_Categories.sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_sub_Categories.sub_sub_sub_category',
                select: '-__v -enable -deleted  -subCategory',
            })
            .sort(sort);
        return users;
    }

    async getByEmail(email: string): Promise<User> {
        return this.userModel
            .findOne({ email: email })
            .populate({
                path: 'homeOwners',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'templates',
                select: '-__v -enable',
            })
            .populate({
                path: 'categories.category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_sub_Categories.sub_sub_sub_category',
                select: '-__v -enable -deleted  -subCategory',
            });
    }

    async getByIdEmail(key: string): Promise<User> {
        return this.userModel
            .findOne({
                $or: [
                    {
                        firstName: key,
                    },
                    {
                        email: key,
                    },
                    {
                        phone: key,
                    },
                    {
                        lastName: key,
                    },
                ],
            })
            .populate({
                path: 'homeOwners',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'templates',
                select: '-__v -enable',
            })
            .populate({
                path: 'categories.category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_sub_Categories.sub_sub_sub_category',
                select: '-__v -enable -deleted  -subCategory',
            });
    }

    async getById(key: string): Promise<User> {
        return this.userModel
            .findOne({ _id: key })
            .populate({
                path: 'homeOwners',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'templates',
                select: '-__v -enable',
            })
            .populate({
                path: 'categories.category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_category',
                select: '-__v -enable -deleted -created_at -updated_at -subCategory',
            })
            .populate({
                path: 'categories.sub_Categories.sub_sub_Categories.sub_sub_sub_Categories.sub_sub_sub_category',
                select: '-__v -enable -deleted  -subCategory',
            });
    }
    async getPricingById(user: User, query: any) { }
}
