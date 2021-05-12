import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';
import { LoginModule } from './login.module';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), LoginModule],
      providers: [LoginService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
