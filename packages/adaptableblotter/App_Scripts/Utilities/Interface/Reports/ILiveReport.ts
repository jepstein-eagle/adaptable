import { ExportDestination } from '../../Enums';
export interface ILiveReport {
  WorkbookName: string;
  Report: string;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
