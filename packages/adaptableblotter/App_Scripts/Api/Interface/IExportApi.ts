import { ExportDestination } from '../../PredefinedConfig/Common Objects/Enums';
import { ExportState, IReport } from '../../PredefinedConfig/IUserState Interfaces/ExportState';

export interface IExportApi {
  getExportState(): ExportState;
  getCurrentReport(): IReport;
  getCurrentReportName(): string;
  getAllReports(): IReport[];
  sendReport(reportName: string, destination: ExportDestination): void;
}
