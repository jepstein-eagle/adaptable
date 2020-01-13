import { RpcDispatcher } from './RpcDispatcher';
import { ExcelApplication } from './ExcelApplication';
import { ExcelWorksheet } from './ExcelWorksheet';
export declare class ExcelWorkbook extends RpcDispatcher {
  application: ExcelApplication;
  //JO: DOESNT WORK!! USE NAME instead that I added
  //workbookName: string;
  name: string;
  worksheets: {
    [worksheetName: string]: ExcelWorksheet;
  };
  constructor(application: ExcelApplication, name: string);
  getDefaultMessage(): any;
  getWorksheets(callback: Function): void;
  getWorksheetByName(name: string): ExcelWorksheet;
  addWorksheet(callback: Function): void;
  activate(): void;
  save(): void;
  close(): void;
  toObject(): any;
}
