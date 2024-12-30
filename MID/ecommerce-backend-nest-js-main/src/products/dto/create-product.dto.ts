import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsNumber,
  IsEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @IsString({ message: 'Short description must be a string.' })
  @IsNotEmpty({ message: 'Short description is required.' })
  @MaxLength(255, {
    message: 'Short description is too long. Max length is 255 characters.',
  })
  short_description: string;

  @IsString({ message: 'Long description must be a string.' })
  @IsNotEmpty({ message: 'Long description is required.' })
  @MaxLength(1000, {
    message: 'Long description is too long. Max length is 1000 characters.',
  })
  long_description: string;

  @IsNumber({}, { message: 'Price must be a Number.' })
  @IsNotEmpty({ message: 'Price is required.' })
  @IsPositive({ message: 'Price should be positive number' })
  price: number;

  @IsNumber({}, { message: 'Stock must be a number.' })
  @IsNotEmpty({ message: 'Stock is required.' })
  stock: number;

  @IsString({ message: 'Images must be a string.' })
  @IsNotEmpty({ message: 'Images are required.' })
  images: string;
  @IsNotEmpty({ message: 'Category Id is required.' })
  @IsNumber({}, { message: 'Category id should be a number' })
  categoryId: number;
}
