import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional() // Optional because the user may want to update only certain fields
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title?: string;

  @IsOptional() // Optional because the user may want to update only certain fields
  @IsNotEmpty()
  @IsString()
  @MaxLength(150, {
    message: 'Short description must not exceed 150 characters',
  })
  short_description?: string;

  @IsOptional() // Optional because the user may want to update only certain fields
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000, {
    message: 'Long description must not exceed 1000 characters',
  })
  long_description?: string;
}
