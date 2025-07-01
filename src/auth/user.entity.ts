import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column()
  @IsString()
  @Length(6, 100)
  password: string;
}
