import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateHomeOwnerDto, QueryHomeOwnerDto } from './homeowner.dto';
import { Homeowner } from './homeowner.entity';
import { HomeownerRepository } from './homeowner.repository';

interface IWhere {
  clientManagerId: string;
  creatorId: string;
  'persons.firstName': string;
}

@Injectable()
export class HomeownerService {
  constructor(private readonly homeownerRepository: HomeownerRepository) {}

  public async createHomeOwner(user, createHomeOwnerDto: CreateHomeOwnerDto) {
    try {
      if (user.type == 'clientManager')
        createHomeOwnerDto.clientManagerId = user._id;
      if (user.type == 'clientSales')
        createHomeOwnerDto.clientManagerId = user.clientManagerId;
      createHomeOwnerDto.creatorId = user._id;

      return this.homeownerRepository.create(createHomeOwnerDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getAllHomeOwner(user, query: QueryHomeOwnerDto, body) {
    try {
      let size = query.size;

      const { firstName } = query;
      if (body.sort && Object.keys(body.sort).length !== 0) {
        let sort = {
          ...body.sort,
        };
      }
      // let query = {}
      if (!query.page) {
        query.page = 1;
      }
      if (!size) {
        size = 10;
      }
      query.skip = size * (query.page - 1);
      query.limit = size;
      let where: IWhere;
      if (user.type == 'clientManager') {
        where.clientManagerId = user._id;
      }
      if (user.type == 'clientSales') {
        where.creatorId = user._id;
      }
      if (firstName) {
        where['persons.firstName'] = firstName;
      }
      // if (query.all === 'true') {
      //     query = {}
      // }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
