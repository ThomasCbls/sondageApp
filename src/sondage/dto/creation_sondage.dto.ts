import {
  IsArray,
  ArrayMinSize,
  IsBoolean,
  IsString,
  Length,
} from 'class-validator';

export class CreationSondageDto {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  multipleAnswers: boolean;

  @IsArray()
  @ArrayMinSize(2, { message: 'Un sondage doit avoir au moins 2 options' })
  @IsString({ each: true })
  options: string[];
}
