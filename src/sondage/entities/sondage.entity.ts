import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SondageOption } from './sondage_option.entity';
import { IsBoolean, IsString, Length } from 'class-validator';

@Entity()
export class Sondage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(1, 255)
  title: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  description: string;

  @Column({ default: false })
  @IsBoolean()
  multipleAnswers: boolean;

  @Column({ default: false }) // 👈 Nouveau champ
  isClosed: boolean;

  @OneToMany(() => SondageOption, (option) => option.poll, {
    cascade: true,
    eager: true,
  })
  options: SondageOption[];
}
