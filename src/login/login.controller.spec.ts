import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginModule } from './login.module';
import { KnexModule } from '../knex/knex.module';
import knexConfig from '../knex/knex.config';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.register(knexConfig), LoginModule],
      controllers: [LoginController],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
