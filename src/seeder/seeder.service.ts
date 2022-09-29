import { BadRequestException, Injectable } from '@nestjs/common';
import * as superAdmin from '@root/seeder/data/superAdmin.json';
import clientManager from '@root/seeder/data/clientManager.json';
import { UserRepository } from '@root/user/repositories/user.repository';
import { ValidateUser } from '@root/common/validation/validateUsers';
import * as bcrypt from 'bcrypt';
import { User } from '@root/user/entities/user.entity';

@Injectable()
export class SeederService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createSuperAdmin(): Promise<any> {
    console.log('seeder ', superAdmin);

    const validationData: ValidateUser = {
      firstName: superAdmin.firstName,
      email: superAdmin.email,
      password: superAdmin.password,
      address: superAdmin.address,
    };

    const admins = await this.userRepository.getByType('admin');
    console.log('adminssss', admins);

    if (admins.length > 0)
      throw new BadRequestException('SuperAdmin Already created');

    // superAdmin.password = await bcrypt.hash(superAdmin.password, 10);
    // return this.userRepository.createAndSave(superAdmin);
  }

  public async general() {
    try {
      // const category = await categoryFunctions.createAndSave(
      // 	parentCategory,
      // 	session
      // )
      // await categoryFunctions.createAndSave(subCategory, session)
      // await categoryFunctions.createAndSave(subSubCategory, session)

      clientManager.password = await bcrypt.hash(superAdmin.password, 10);

      await this.userRepository.createAndSave(clientManager);
      //   await homeOwnerFunctions.createAndSave(homeOwner, session);
      //   await customFieldFunctions.createAndSave(customFieldPurposal, session);
      //   await proposalFunctions.createAndSave(proposal, session);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
