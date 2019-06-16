import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ExportState, Report } from '../../PredefinedConfig/IUserState/ExportState';

export interface IExportApi {
  getExportState(): ExportState;
  getCurrentReport(): Report;
  getCurrentReportName(): string;
  getAllReports(): Report[];
  sendReport(reportName: string, destination: ExportDestination): void;
}
