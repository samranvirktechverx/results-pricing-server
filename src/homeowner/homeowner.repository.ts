import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Homeowner, HomeownerDocument } from './homeowner.entity';
import { CreateHomeOwnerDto } from './homeowner.dto';

@Injectable()
export class HomeownerRepository {
  constructor(
    @InjectModel(Homeowner.name) private userModel: Model<HomeownerDocument>,
  ) {}

  async create(createHomeOwnerDto: CreateHomeOwnerDto): Promise<Homeowner> {
    return this.userModel.create(createHomeOwnerDto);
  }
}
