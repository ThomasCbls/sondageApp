import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SondageService } from './sondage.service';
import { CreationSondageDto } from './dto/creation_sondage.dto';
import { VoteDto } from './dto/vote.dto';

@Controller('sondages')
export class SondageController {
  constructor(private readonly sondageService: SondageService) {}

  @Post()
  create(@Body() dto: CreationSondageDto) {
    return this.sondageService.createSondage(dto);
  }

  @Get()
  getAll() {
    return this.sondageService.getAll();
  }

  // À implémenter ensuite
  @Post(':id/vote')
  vote(@Param('id') id: number, @Body() voteDto: VoteDto) {
    return this.sondageService.vote(id, voteDto);
  }
}
