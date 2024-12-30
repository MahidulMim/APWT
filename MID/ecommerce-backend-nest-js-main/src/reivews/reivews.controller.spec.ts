import { Test, TestingModule } from '@nestjs/testing';
import { ReivewsController } from './reivews.controller';
import { ReivewsService } from './reivews.service';

describe('ReivewsController', () => {
  let controller: ReivewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReivewsController],
      providers: [ReivewsService],
    }).compile();

    controller = module.get<ReivewsController>(ReivewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
