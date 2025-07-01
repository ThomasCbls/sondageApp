import { IsArray, IsInt, IsString, ArrayMinSize, ValidateIf } from 'class-validator';

export class VoteDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  optionIds: number[];

  @IsString()
  userIdentifier: string; // UUID ou IP
}
