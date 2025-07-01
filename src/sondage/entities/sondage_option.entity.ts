import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Sondage } from './sondage.entity';
import { Vote } from './vote.entity';
import { IsString } from 'class-validator';

@Entity()
export class SondageOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  text: string;

  @ManyToOne(() => Sondage, (sondage) => sondage.options, { onDelete: 'CASCADE' })
  poll: Sondage;

  @OneToMany(() => Vote, (vote) => vote.option)
  votes: Vote[];
}
