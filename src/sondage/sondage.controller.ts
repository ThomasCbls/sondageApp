import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SondageService } from './sondage.service';
import { CreationSondageDto } from './dto/creation_sondage.dto';
import { VoteDto } from './dto/vote.dto';
import { ParseIntPipe } from '@nestjs/common';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

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

  @Get(':id')
  getSondage(@Param('id') id: number) {
  return this.sondageService.getById(id);
}

@Post(':id/vote')
@UseGuards(JwtAuthGuard)
vote(
  @Param('id', ParseIntPipe) id: number,
  @Body() voteDto: VoteDto,
  @Req() req: Request,
) {
const user = req.user as { userId: number; username: string };
  return this.sondageService.vote(id, voteDto, user);
}

}

