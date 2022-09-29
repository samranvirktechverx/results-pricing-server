import { Injectable, Req, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@User/entities/user.entity';
import { CreateUserDTO } from '@User/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@User/repositories/user.repository';
import { OptionGetAll } from '@User/interfaces/option-get-all.interface';
import { ProposalDocument } from '@root/proposal/entities/proposal.entity';
import { _ } from 'agile';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
        private readonly userRepository: UserRepository,
        @InjectModel('Proposal')
        private readonly proposalModel: Model<ProposalDocument>,
    ) { }

    async addUser(createUserDTO: CreateUserDTO): Promise<any> {
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

    async createClient(req: any): Promise<any> {
        const password = await this.makePassword(6);
        const { body } = req;

        try {
            if (req.user.type != 'admin' && body.type == 'clientManager') {
                return 'Just Super Admin can create Client Manager';
            }
            if (req.user.type != 'clientManager' && body.type == 'clientSales') {
                return 'Just Client Manager can create Client Sales';
            }

            const userFind = await this.userRepository.getByEmail(body.email);
            if (body.categories) {
                if (body.categories.length > 0) {
                    body.categories.forEach((category) => {
                        category.active = true;
                        category.quantity = 0;
                        if (category.sub_Categories && category.sub_Categories.length > 0) {
                            category.sub_Categories.forEach((subCategory) => {
                                subCategory.active = true;
                                subCategory.quantity = 0;
                                if (
                                    subCategory.sub_sub_Categories &&
                                    subCategory.sub_sub_Categories.length > 0
                                ) {
                                    subCategory.sub_sub_Categories.forEach((subSubCategory) => {
                                        subSubCategory.active = true;
                                        subSubCategory.quantity = 0;
                                        if (
                                            subSubCategory.sub_sub_sub_Categories &&
                                            subSubCategory.sub_sub_sub_Categories.length > 0
                                        ) {
                                            subSubCategory.sub_sub_sub_Categories.forEach(
                                                (subSubSubCat) => {
                                                    subSubSubCat.active = true;
                                                    subSubSubCat.quantity = 0;
                                                },
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
            if (userFind) {
                return 'User already exists';
            }
            if (body.type == 'clientSales') {
                body.clientManagerId = req.user._id;
                body.allowDiscount = req.user.allowDiscount;
                body.tax = req.user.tax;
                body.profit = req.user.profit;
                body.clientManagerEmail = req.user.email;
            }
            //         const passwordEmail = password
            //         console.log(password)
            //         body.password = await hashing.encrypt(password)

            //         // return res.send(Util.getOkRequest(body, "Created Successfully"))

            //         const user = await userFunctions.createAndSave(body, session)
            //         const mailData = {
            //             body: `Hi ${body.firstName}, \n
            // Your account has been created. \n\n
            // Email: ${body.email} \n
            // Password: ${passwordEmail} \n\n
            // Click on given link for Login ${'https://results-pricing.com/'}\n`,
            //             subject: 'Account Setup',
            //             to: body.email,
            //         }
            //         emailService.sendMail(mailData)

            return 'Created Successfully';
        } catch (error) {
            return 'error';
        }
    }

    async makePassword(length: number) {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async getAll(req: any): Promise<any> {
        const { user: userId, query, body = null } = req;
        const user = await this.userModel.findOne({ _id: userId });

        let isClientManager = false;
        if (user.type == 'clientManager') {
            isClientManager = true;
        }

        let counts = [];
        try {
            const usersLength = await this.userRepository.getLength(user, query);
            let users = await this.userRepository.getAll(user, query, body);

            if (isClientManager) {
                await Promise.all(
                    users.map(async (user) => {
                        let option: OptionGetAll = {
                            creatorId: user._id.toString(),
                        };
                        const totalProposals = await this.proposalModel.countDocuments(
                            option,
                        );
                        counts.push(totalProposals);
                    }),
                );
            }
            console.log('countsssssssssssss', counts);

            if (users.length == 0) {
                return 'No User Found';
            }

            return {
                users,
                proposal: counts,
                total: usersLength,
            }

            users.forEach((value, index) => {
                //console.log('value', value.proposalCount);
                value.proposalCount = counts[index];
            });
            if (req.body.sort.proposalCount == 1) {
                users = _.orderBy(users, 'proposalCount');
            }
            if (req.body.sort.proposalCount == -1) {
                let ascCounts = _.orderBy(users, 'proposalCount');
                users = _.reverse(ascCounts);
            }
            if (req.body.sort.address == 1) {
                users = _.orderBy(users, 'address.street');
            }
            if (req.body.sort.address == -1) {
                let ascAddress = _.orderBy(users, 'address.street');
                users = _.reverse(ascAddress);
            }
        } catch (error) {
            return error;
        }
    }
}
