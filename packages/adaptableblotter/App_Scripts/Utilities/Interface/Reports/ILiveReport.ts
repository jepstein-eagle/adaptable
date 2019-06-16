import { ExportDestination } from '../../../PredefinedConfig/Common Objects/Enums';
import { IReport } from '../../../PredefinedConfig/IUserState Interfaces/ExportState';

export interface ILiveReport {
  WorkbookName: string;
  Report: IReport;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
