import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SondageOption } from './sondage_option.entity';
import { IsString } from 'class-validator';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SondageOption, (option) => option.votes, { onDelete: 'CASCADE' })
  option: SondageOption;

  @Column()
  @IsString()
  userIdentifier: string; // Peut être une IP ou un UUID stocké côté frontend
}
