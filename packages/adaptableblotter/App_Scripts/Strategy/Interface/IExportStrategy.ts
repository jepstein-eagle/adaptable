import { IStrategy } from './IStrategy';
import { ExportDestination } from '../../PredefinedConfig/Common Objects/Enums';
import { IReport } from '../../PredefinedConfig/IUserState Interfaces/ExportState';

export interface IExportStrategy extends IStrategy {
  Export(
    report: IReport,
    exportDestination: ExportDestination,
    folder?: string,
    page?: string
  ): void;

  scheduleReports(): void;
}
