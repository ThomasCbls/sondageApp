import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SondageModule } from './sondage/sondage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity.ts'],
      synchronize: true,
    }),
    SondageModule,
  ],
})
export class AppModule {}
