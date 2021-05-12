import { Test, TestingModule } from '@nestjs/testing';
import { KnexService } from './knex.service';
import knexConfig from '../knex/knex.config';

describe('KnexService', () => {
  let service: KnexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: knexConfig,
        },
        KnexService,
      ],
    }).compile();

    service = module.get<KnexService>(KnexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
