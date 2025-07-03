import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sondage } from './entities/sondage.entity';
import { SondageOption } from './entities/sondage_option.entity';
import { SondageService } from './sondage.service';
import { SondageController } from './sondage.controller';
import { Vote } from './entities/vote.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Sondage, SondageOption, Vote]),
  AuthModule
],
  controllers: [SondageController],
  providers: [SondageService],
})
export class SondageModule {}
