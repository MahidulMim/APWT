import { Test, TestingModule } from '@nestjs/testing';
import { ReivewsService } from './reivews.service';

describe('ReivewsService', () => {
  let service: ReivewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReivewsService],
    }).compile();

    service = module.get<ReivewsService>(ReivewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
