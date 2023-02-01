import { Test, TestingModule } from '@nestjs/testing';
import { ViewResolver } from './view.resolver';
import { ViewService } from './view.service';

describe('ViewResolver', () => {
  let resolver: ViewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewResolver, ViewService],
    }).compile();

    resolver = module.get<ViewResolver>(ViewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
