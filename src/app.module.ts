import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sondage } from './sondage/sondage.entity';
import { SondageOption } from './sondage/sondage_option.entity';
import { Vote } from './sondage/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'sondage',
      entities: [Sondage, SondageOption, Vote],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Sondage, SondageOption, Vote]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
