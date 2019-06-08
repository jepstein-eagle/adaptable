import { ExportDestination } from '../../Enums';
import { IReport } from '../BlotterObjects/IReport';
export interface ILiveReport {
  WorkbookName: string;
  Report: IReport;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
