import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sondage } from './sondage/entities/sondage.entity';
import { SondageOption } from './sondage/entities/sondage_option.entity';
import { Vote } from './sondage/entities/vote.entity';
import { User } from './auth/user.entity';
import { SondageModule } from './sondage/sondage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Thomas72.',
      database: 'sondages',
      entities: [Sondage, SondageOption, Vote, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Sondage, SondageOption, Vote, User]),
    SondageModule,
  ],
})
export class AppModule {}
