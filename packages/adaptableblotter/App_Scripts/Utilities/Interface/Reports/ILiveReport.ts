import { ExportDestination } from '../../../PredefinedConfig/Common/Enums';
import { IReport } from '../../../PredefinedConfig/IUserState/ExportState';

export interface ILiveReport {
  WorkbookName: string;
  Report: IReport;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
