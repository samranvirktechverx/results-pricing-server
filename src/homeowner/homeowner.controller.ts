import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateHomeOwnerDto } from './homeowner.dto';
import { HomeownerService } from './homeowner.service';

@Controller('homeowner')
export class HomeownerController {
  constructor(private readonly homeownerService: HomeownerService) {}

  @Post('create')
  private async create(@Req() req, @Body() createDto: CreateHomeOwnerDto){
    return this.homeownerService.createHomeOwner(req.user, createDto)
  }

}
