import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sondage } from './entities/sondage.entity';
import { CreationSondageDto } from './dto/creation_sondage.dto';
import { SondageOption } from './entities/sondage_option.entity';
import { VoteDto } from './dto/vote.dto';
import { Vote } from './entities/vote.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class SondageService {
  constructor(
    @InjectRepository(Sondage)
    private sondageRepo: Repository<Sondage>,

    @InjectRepository(SondageOption)
    private optionRepo: Repository<SondageOption>,

    @InjectRepository(Vote)
    private voteRepo: Repository<Vote>,
  ) {}

  async createSondage(dto: CreationSondageDto): Promise<Sondage> {
    const sondage = this.sondageRepo.create({
      title: dto.title,
      description: dto.description,
      multipleAnswers: dto.multipleAnswers,
      options: dto.options.map((label) => {
        const option = new SondageOption();
        option.text  = label;
        return option;
      }),
    });

    return this.sondageRepo.save(sondage);
  }

async vote(sondageId: number, voteDto: VoteDto, user: { userId: number; username: string }) {
    const sondage = await this.sondageRepo.findOne({
      where: { id: sondageId },
      relations: ['options'],
    });

    if (!sondage) {
      throw new NotFoundException('Sondage non trouvé');
    }

    if (sondage.isClosed) {
      throw new BadRequestException('Ce sondage est clôturé. Le vote est impossible.');
    }

    if (!sondage.multipleAnswers && voteDto.optionIds.length > 1) {
      throw new BadRequestException('Ce sondage n’autorise qu’un seul vote');
    }

    // Valider que les options appartiennent bien à ce sondage
    const validOptionIds = sondage.options.map((opt) => opt.id);
    for (const id of voteDto.optionIds) {
      if (!validOptionIds.includes(id)) {
        throw new BadRequestException(`Option invalide : ${id}`);
      }
    }

 const votes = voteDto.optionIds.map((id) => {
    const vote = new Vote();
    vote.option = { id } as any;
    vote.userIdentifier = user.username;
    return vote;
  });
    return this.voteRepo.save(votes);
  }

  async getAll(): Promise<Sondage[]> {
    return this.sondageRepo.find();
  }

    async getById(id: number): Promise<Sondage> {
    const sondage = await this.sondageRepo.findOne({
      where: { id },
      relations: ['options'], // si tu veux les options avec
    });

    if (!sondage) {
      throw new NotFoundException(`Sondage avec l'id ${id} non trouvé`);
    }

    return sondage;
  }

  async closeSondage(id: number): Promise<Sondage> {
  const sondage = await this.sondageRepo.findOne({ where: { id } });

  if (!sondage) {
    throw new NotFoundException('Sondage non trouvé');
  }

  sondage.isClosed = true;
  return this.sondageRepo.save(sondage);
}

  async getStats(id: number) {
    const sondage = await this.sondageRepo.findOne({
      where: { id },
      relations: ['options', 'options.votes'],
    });

    if (!sondage) {
      throw new NotFoundException('Sondage non trouvé');
    }

    const results = sondage.options.map((option) => ({
      optionId: option.id,
      text: option.text,
      votes: option.votes?.length || 0,
    }));

    return {
      sondageId: sondage.id,
      title: sondage.title,
      isClosed: sondage.isClosed,
      totalVotes: results.reduce((acc, curr) => acc + curr.votes, 0),
      options: results,
    };
  }

  async deleteSondage(id: number): Promise<void> {
    await this.sondageRepo.delete(id);
  }

}
