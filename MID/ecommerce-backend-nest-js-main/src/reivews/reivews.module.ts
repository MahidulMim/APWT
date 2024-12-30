import { Module } from '@nestjs/common';
import { ReivewsService } from './reivews.service';
import { ReivewsController } from './reivews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReivewEntity } from './entities/reivew.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReivewEntity]), ProductsModule],
  controllers: [ReivewsController],
  providers: [ReivewsService],
})
export class ReivewsModule {}
