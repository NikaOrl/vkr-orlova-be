import { Injectable } from '@nestjs/common';
import * as excel from 'exceljs';

@Injectable()
export class GenerateTableService {
  async createExcel(
    headers: Partial<excel.Column>[],
    rows: any[],
  ): Promise<Buffer> {
    try {
      const workbook: excel.stream.xlsx.WorkbookWriter = new excel.stream.xlsx.WorkbookWriter(
        {},
      );

      const sheet: excel.Worksheet = workbook.addWorksheet('My Worksheet');
      sheet.columns = headers;

      for (let i = 0; i < rows.length; i++) {
        sheet.addRow(rows[i]);
      }

      sheet.commit();
      await workbook.commit();

      const stream: any = (workbook as any).stream;

      return stream.read();
    } catch (e) {
      console.log(e);
    }
  }

  async parseExcel(fileBuffer) {
    const wb = new excel.Workbook();
    const workbook = await wb.xlsx.load(fileBuffer);

    const table = [];

    workbook.eachSheet((sheet, id) => {
      sheet.eachRow((row, rowIndex) => {
        table.push(row.values);
        // console.log(row.values, rowIndex);
      });
    });

    return table;
  }
}
