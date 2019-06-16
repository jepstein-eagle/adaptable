import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ExportState, IReport } from '../../PredefinedConfig/IUserState/ExportState';

export interface IExportApi {
  getExportState(): ExportState;
  getCurrentReport(): IReport;
  getCurrentReportName(): string;
  getAllReports(): IReport[];
  sendReport(reportName: string, destination: ExportDestination): void;
}
