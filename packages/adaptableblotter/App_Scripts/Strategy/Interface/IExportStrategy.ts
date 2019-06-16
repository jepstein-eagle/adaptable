import { IStrategy } from './IStrategy';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/IUserState/ExportState';

export interface IExportStrategy extends IStrategy {
  Export(
    report: Report,
    exportDestination: ExportDestination,
    folder?: string,
    page?: string
  ): void;

  scheduleReports(): void;
}
