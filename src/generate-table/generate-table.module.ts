import { Module } from '@nestjs/common';
import { GenerateTableService } from './generate-table.service';

@Module({
  providers: [GenerateTableService],
  exports: [GenerateTableService],
})
export class GenerateTableModule {}
