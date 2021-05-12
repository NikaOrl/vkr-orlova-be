import { Test, TestingModule } from '@nestjs/testing';
import { GenerateDatabaseController } from './generate-database.controller';

describe('GenerateDatabaseController', () => {
  let controller: GenerateDatabaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateDatabaseController],
    }).compile();

    controller = module.get<GenerateDatabaseController>(GenerateDatabaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
