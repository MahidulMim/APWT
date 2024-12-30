import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReivewDto {
  @IsNotEmpty({ message: 'Product should not be empty.' })
  @IsNumber({}, { message: 'Product Id should be number' })
  productId: number;

  @IsInt({ message: 'Ratings must be an integer.' })
  @Min(1, { message: 'Ratings must be at least 1.' })
  @Max(5, { message: 'Ratings cannot exceed 5.' })
  @IsNotEmpty({ message: 'Ratings are required.' })
  ratings: number;

  @IsString({ message: 'Comment must be a string.' })
  @IsNotEmpty({ message: 'Comment is required.' })
  comment: string;
}
