import { ExportDestination } from '../../../PredefinedConfig/Common/Enums';
import { Report } from '../../../PredefinedConfig/ExportState';

export interface ILiveReport {
  WorkbookName: string;
  Report: Report;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
