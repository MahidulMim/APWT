import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150, {
    message: 'Short description must not exceed 150 characters',
  })
  short_description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000, {
    message: 'Long description must not exceed 1000 characters',
  })
  long_description: string;
}
