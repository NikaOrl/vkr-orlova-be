import { Controller, Get } from '@nestjs/common';

@Controller('disciplines')
export class DisciplinesController {
  @Get()
  getDisciplines(): string {
    return 'disciplines';
  }
}
