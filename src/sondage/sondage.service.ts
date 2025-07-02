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

    async vote(sondageId: number, voteDto: VoteDto) {
    const sondage = await this.sondageRepo.findOne({
      where: { id: sondageId },
      relations: ['options'],
    });

    if (!sondage) {
      throw new NotFoundException('Sondage non trouvé');
    }

    // Si réponse multiple non autorisée
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

    // Créer les votes
    const votes = voteDto.optionIds.map((id) => {
      const vote = new Vote();
      vote.option = { id } as any;
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
}
