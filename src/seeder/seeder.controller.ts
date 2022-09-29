import { Controller, Post } from '@nestjs/common';
import { User } from '@root/user/entities/user.entity';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('createSuperAdmin')
  private async superAdmin(): Promise<any> {
    return this.seederService.createSuperAdmin();
  }

  @Post('/category/clientManager/salesManager/homeOwner/proposal')
  private async general() {
    return this.seederService.general();
  }
}
