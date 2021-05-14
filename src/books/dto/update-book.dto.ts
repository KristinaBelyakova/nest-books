import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  author: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  image: string
}
