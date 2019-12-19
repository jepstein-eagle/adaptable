import { IStrategy } from './IStrategy';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';

export interface IExportStrategy extends IStrategy {
  Export(
    report: Report,
    exportDestination: ExportDestination,
    isLiveReport: boolean,
    folder?: string,
    page?: string
  ): void;

  scheduleReports(): void;
}
