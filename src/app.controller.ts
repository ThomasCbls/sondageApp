import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreationSondageDto } from './sondage/dto/creation_sondage.dto';
import { VoteDto } from './sondage/dto/vote.dto';
import { Sondage } from './sondage/sondage.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
createSondage(@Body() creationSondageDto: CreationSondageDto) {
  return this.Sondage.createSondage(creationSondageDto);
}

@Post(':id/vote')
vote(@Param('id') id: number, @Body() voteDto: VoteDto) {
  return this.sondageService.vote(id, voteDto);
}
}
