import { PartialType } from '@nestjs/mapped-types';
import { CreateReivewDto } from './create-reivew.dto';

export class UpdateReivewDto extends PartialType(CreateReivewDto) {}
